import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { TaskTypes, StatusTypes, PriorityTypes } from 'src/app/models/project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskValidators } from 'src/app/services/task.validators';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.less']
})
export class TaskInfoComponent implements OnInit {
  users: User[] = [];
  status = StatusTypes;
  infoForm: FormGroup;
  changeInfo = null;
  constructor(private ts:TaskService, private ps:ProjectService, private fb:FormBuilder) { }

  ngOnInit() {
    this.infoForm = this.fb.group({
      UserId: ['', Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      PlanTime: ['', TaskValidators.ValidateNumberGEZerro],
      FactTime: ['', TaskValidators.ValidateNumberGEZerro]
    });
    this.infoForm.patchValue(this.ts.task);
    this.infoForm.valueChanges.subscribe(x => {
      this.changeInfo = x;
    })
    this.ps.getProjectTeam(this.ts.task.ProjectId).subscribe(team => {
      this.users = team;
    })
  }

  cancel(){
    this.infoForm.patchValue(this.ts.task);
  }

  save(){
    if(this.infoForm.invalid){
      return;
    }
    this.ps.updateTask(this.changeInfo).subscribe(res => {
      if(res){
        this.ts.task = Object.assign(this.ts.task, this.changeInfo);
      }
      this,this.changeInfo = null;
      this.infoForm.reset(this.ts.task);
    })
  }

  get statuses(){
    let result = [];
    for (const key in this.status) {
      result.push({
        Name:this.status[key]
      })
    }
    return result;
  }
  get priorities(){
    let result = [];
    for (const key in PriorityTypes) {
      result.push({
        Name:PriorityTypes[key]
      })
    }
    return result;
  }

  get controls() {return this.infoForm.controls};
}
