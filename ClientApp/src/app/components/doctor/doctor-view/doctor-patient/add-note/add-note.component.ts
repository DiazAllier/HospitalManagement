import { Component, Input } from '@angular/core';
import { Notes } from '../../../../../models/note.model';
import { NotesServices } from '../../../../../services/note.service';
import { StorageService } from '../../../../../services/storage.service';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../../../app.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  public visible: boolean;
  public note: Notes = new Notes();
  @Input() patientData;
  constructor(private notesService: NotesServices, private storageService: StorageService, private app: AppComponent) { }


  showDialog() {
    this.visible = true;
  }

  addNote() {
    this.note.patient = this.patientData;
    this.note.doctor = this.storageService.getDoctor();
    this.notesService.createNote(this.note).subscribe({
      next: data => {
        this.visible = false;
        this.app.reloadCurrentRoute();
        Swal.fire(data.message, "Note created successfully", "success")
      }, error: err => {
        this.visible = false;
        Swal.fire("Error", err.error.message, "error")
      }
    })
  }
}
