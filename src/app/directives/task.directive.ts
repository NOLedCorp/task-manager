import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TaskTypes, ProjectType } from '../models/project.model';

@Directive({
    selector:'[type]'
})
export class TaskDirective implements OnInit{
    @Input('type') type:string;
    constructor(private element:ElementRef){
        
        
    }

    ngOnInit(){
        switch (this.type){
            case TaskTypes.Bug: {
                this.element.nativeElement.classList.add('task-bug');
                break;
            }
            case TaskTypes.Task: {
                this.element.nativeElement.classList.add('status-active');
                break;
            }
            case TaskTypes.Requirement: {
                this.element.nativeElement.classList.add('task-requirement');
                break;
            }
            case ProjectType.Landing: {
                this.element.nativeElement.classList.add('status-resolved');
                break;
            }
            case ProjectType.Card: {
                this.element.nativeElement.classList.add('task-requirement');
                break;
            }
            case ProjectType.EShop: {
                this.element.nativeElement.classList.add('status-active');
                break;
            }
            case ProjectType.InfoPortal: {
                this.element.nativeElement.classList.add('status-proposed');
                break;
            }
            case ProjectType.BusinessPortal: {
                this.element.nativeElement.classList.add('status-closed');
                break;
            }
        }
    }
}