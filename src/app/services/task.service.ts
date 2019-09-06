import { Task } from '../models/project.model';
import { FormGroup } from '@angular/forms';
import { ProjectService } from './project.service';
import { Observable, Subject } from 'rxjs';

export class TaskService{
    constructor(private ps:ProjectService){
      
    }
    public task:Task = null;
    public changeInfo = null;
    private taskIdList = [];
    public infoForm: FormGroup;

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
      this.setShow(id);
    }

    next(){
    }

    prev(){
      
    }

    private setShow(id){
      if(id==this.taskIdList[0]){
        this._show.next=true;
        this._show.prev=false;
      }else if(id == this.taskIdList[-1]){
        this._show.prev=true;
        this._show.next=false;
      }else{
        this._show = {next:true, prev:true}
      }
    }

    public get show() {return this._show};
    
}