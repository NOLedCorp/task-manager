import { Component, OnInit, HostListener } from '@angular/core';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.less']
})
export class LoadComponent implements OnInit {
  @HostListener('document:keydown.esc') close(){
    this.service.showLoad = false;
  }
  constructor(public service:LoadService) { }

  ngOnInit() {
  }

}
