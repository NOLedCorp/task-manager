import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PriorityTypes } from '../models/project.model';

@Directive({
    selector:'[priority]'
})
export class PriorityDirective implements OnInit{
    @Input('priority') priority:string;
    constructor(private element:ElementRef){
        
        
    }

    ngOnInit(){
        switch (this.priority){
            case PriorityTypes.Critical: {
                this.element.nativeElement.classList.add('priority-critical');
                break;
            }
            case PriorityTypes.High: {
                this.element.nativeElement.classList.add('task-bug');
                break;
            }
            case PriorityTypes.Medium: {
                this.element.nativeElement.classList.add('task-active');
                break;
            }
            case PriorityTypes.Low: {
                this.element.nativeElement.classList.add('status-resolved');
                break;
            }
        }
    }
}