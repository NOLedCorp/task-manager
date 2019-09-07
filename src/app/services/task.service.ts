import { Task } from '../models/project.model';
import { FormGroup } from '@angular/forms';
import { ProjectService } from './project.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

export class TaskService{
    constructor(private ps:ProjectService, private router:Router){
      
    }
    public task:Task = null;
    public changeInfo = null;
    private taskIdList = [];
    public infoForm: FormGroup;
    private idIndex:number;

    public refreshTask$ = new Subject();
    public taskChanged$ = new Subject<Task>();

    public _show:{prev:boolean, next:boolean} = { prev:false, next:false}

    

    refresh(){
      this.refreshTask$.next();
    }

    save(){
      if(this.infoForm.invalid){
        return;
      }
      this.ps.updateTask(Object.assign(this.changeInfo, {Id:this.task.Id})).subscribe(res => {
        if(res){
          this.task = Object.assign(this.task, this.changeInfo);
        }
        
        this.infoForm.reset(this.task);
        this.changeInfo = null;
      })
    }

    public setIdList(list: number[], id:number){
      this.taskIdList = list;
      this.idIndex = this.taskIdList.indexOf(id);
      this.setShow(id);
    }

    set taskId(id: number){
      this.idIndex = this.taskIdList.indexOf(id);
      this.setShow(id);
    }

    get next(){
      return this._show.next?this.taskIdList[this.idIndex+1]:null;
    }

    get prev(){
      return this._show.next?this.taskIdList[this.idIndex-1]:null;
    }

    private setShow(id){
      this._show = {next:id != this.taskIdList[-1], prev:id != this.taskIdList[0]};
    }

    public get show() {return this._show};
    
}