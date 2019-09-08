import { Component, OnInit } from '@angular/core';
import { ProjectStatus, ProjectType } from '../models/project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.less']
})
export class CreateProjectComponent implements OnInit {
  projectForm:FormGroup
  user:User = null;
  constructor(private fb:FormBuilder, private ps:ProjectService, private router:Router, private ms:ModalService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.projectForm = this.fb.group({
      Name:['', Validators.required],
      GitHubLink: ['', Validators.required],
      ClientContact:['', Validators.required],
      ClientLink: [''],
      Status: [ProjectStatus.Planning, Validators.required],
      Type: [null , Validators.required],
      CreateUserId: [this.user.Id]
    })
  }

  create(){
    if(this.projectForm.invalid){
      return
    }
    this.ps.addProject(this.projectForm.value).subscribe(projectId => {
      console.log(projectId)
      this.ms.close();
      this.router.navigate(['/user',this.user.Id, 'project', projectId])
    })
  }

  get statuses(){
    let result = [];
    for (const key in ProjectStatus) {
      result.push({
        Name:ProjectStatus[key]
      })
    }
    return result;
  }

  get types(){
    let result = [];
    for (const key in ProjectType) {
      result.push({
        Name:ProjectType[key]
      })
    }
    return result;
  }

  get controls() {return this.projectForm.controls}

}
