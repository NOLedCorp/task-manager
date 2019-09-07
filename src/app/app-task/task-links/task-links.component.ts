import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-links',
  templateUrl: './task-links.component.html',
  styleUrls: ['./task-links.component.less']
})
export class TaskLinksComponent implements OnInit {
  shows:{other:boolean, parent:boolean} = {other:true, parent:true};
  constructor() { }

  ngOnInit() {
  }

  show(id){
    this.shows[id]=!this.shows[id];
  }
  
}
