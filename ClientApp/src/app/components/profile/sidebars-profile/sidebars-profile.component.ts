import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-sidebars-profile',
  templateUrl: './sidebars-profile.component.html',
  styleUrls: ['./sidebars-profile.component.css']
})

export class SidebarsProfileComponent implements OnInit {

  constructor(private profile : ProfileComponent) { }

  ngOnInit(): void {
  }

}
