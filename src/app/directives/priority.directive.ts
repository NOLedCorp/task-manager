import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { PriorityTypes } from '../models/project.model';

@Directive({
    selector:'[priority]'
})
export class PriorityDirective implements OnInit, OnChanges{
    @Input('priority') priority:string;
    constructor(private element:ElementRef){
        
        
    }
    ngOnChanges(){
        this.clear();
        this.set();
    }
    ngOnInit(){
        this.set();
    }
    private set(){
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
                this.element.nativeElement.classList.add('status-active');
                break;
            }
            case PriorityTypes.Low: {
                this.element.nativeElement.classList.add('status-resolved');
                break;
            }
        }
    }
    private clear(){
        this.element.nativeElement.classList.remove(
            'priority-critical','task-bug','status-active','status-resolved'
        )
    }
}