import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingScreenComponent implements OnInit {

  loader = true;
  ngOnInit(): void {
    
     //Loader variable set false after page load
    setTimeout(()=>{                           
      this.loader = false;
  }, 1000);
  }
}