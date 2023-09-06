import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NotesServices } from '../../../../../services/note.service';
import { StorageService } from '../../../../../services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Patients } from '../../../../../models/patient.model';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../../../app.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {

  constructor(private notesService: NotesServices, private app: AppComponent, private storageService: StorageService, private _changeDetectorRef: ChangeDetectorRef) { }
  public visible: boolean;
  public searchText;
  @Input() patient: Patients = new Patients();

  ngOnInit() {
    this.loadNotes();
  }
  loadNotes() {
    this.notesService.findByPatientId(this.patient.id).subscribe({
      next: data => {
        this.setPagination(data);
      }, error: err => {
        console.log(err);
      }
    })
  }

  delete(id: number) {
    this.visible = false;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.notesService.delete(id).subscribe({
          next: data => {
            this.loadNotes();
            this.app.Toast.fire(
              'Deleted!',
              'Your note has been deleted.',
              'success'
            )
          }
        })
      }
      this.visible = true;
    })

  }

  showDialog() {
    this.visible = true;
  }


  // PAGINATION
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataObs$: Observable<any>;
  setPagination(list) {
    this.dataSource = new MatTableDataSource<any>(list);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }
}
