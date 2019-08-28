import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TaskTypes } from '../models/project.model';

@Directive({
    selector:'[task]'
})
export class TaskDirective implements OnInit{
    @Input('task') task:string;
    constructor(private element:ElementRef){
        
        
    }

    ngOnInit(){
        switch (this.task){
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
        }
    }
}