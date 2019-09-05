import { Task } from '../models/project.model';
import { FormGroup } from '@angular/forms';
import { ProjectService } from './project.service';

export class TaskService{
    constructor(private ps:ProjectService){}
    task:Task = null;
    changeInfo = null;
    infoForm: FormGroup;

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
}