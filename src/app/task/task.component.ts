import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/internal/operators';
import { Task } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  item:Task = null;
  isEditting = false;
  constructor(private route:ActivatedRoute, private ps:ProjectService) { }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap(params => params.get('workId'))
    // ).subscribe(data=> { console.log(data);});
    this.route.params.pipe(
      tap(x => {
        this.init(+x['workId']);
      })
    ).subscribe()
  }

  init(id:number){
    this.ps.getTask(id).subscribe(x => {
      
      this.item = x;
    })
  }

  edit(){
    this.isEditting = !this.isEditting;
  }

  getFileClass(name){
    let name_arr = name.split('.');
    switch(name_arr[name_arr.length-1]){
      case 'docx':
      case 'doc': {
        return 'fa-file-word';
      }
      case 'xls':
      case 'xlsx': {
        return 'fa-file-excel';
      }
      case 'jpg':
      case 'png':
      case 'gif': {
        return 'fa-file-image';
      }

      case 'ppt':
      case 'pptx': {
        return 'fa-file-powerpoint';
      }

      case 'pdf': {
        return 'fa-file-pdf';
      }

      case 'php':
      case 'js':
      case 'ts':
      case 'cs':
      case 'html':
      case 'css':
      case 'less':
      case 'go':
      case 'sql': {
        return 'fa-file-code';
      }

      default: {
        return 'fa-file-alt';
      }
    }
  }

}
