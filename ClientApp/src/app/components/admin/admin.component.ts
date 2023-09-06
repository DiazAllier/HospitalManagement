import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./css/custom.css'],
})
export class adminComponent implements OnInit {

    constructor(private title:Title) { }
  
    ngOnInit(): void {  
      this.title.setTitle('Administracion');
    }
}
