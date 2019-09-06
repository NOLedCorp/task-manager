import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/internal/operators';
import { Task } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { LoadService } from '../../services/load.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  item:Task = null;
  isEditting = false;
  next = null;
  prev = null;
  constructor(
    private ls:LoadService,
    private route:ActivatedRoute, private ps:ProjectService, private ts:TaskService) { }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap(params => params.get('workId'))
    // ).subscribe(data=> { console.log(data);});
    this.route.params.pipe(
      tap(x => {
        this.init(+x['workId']);
      })
    ).subscribe()
    this.ts.refreshTask$.subscribe(()=> {
      this.init(this.item.Id);
    })
    
  }

  init(id:number){
    this.ls.showLoad = true;
    this.ps.getTask(id).subscribe(x => {
      
      this.item = x;
      this.ts.task = x;
      this.ts.taskId = x.Id;
      this.ts.taskChanged$.next(this.item);
      this.prev = this.ts.prev;
      this.next = this.ts.next;
      this.ls.showLoad=false;
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
