import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TaskTypes, StatusTypes } from '../models/project.model';

@Directive({
    selector:'[status]'
})
export class StatusDirective implements OnInit{
    @Input('status') status:string;
    constructor(private element:ElementRef){
        
        
    }

    ngOnInit(){
        switch (this.status){
            case StatusTypes.Proposed: {
                this.element.nativeElement.classList.add('status-proposed');
                break;
            }
            case StatusTypes.Active: {
                this.element.nativeElement.classList.add('status-active');
                break;
            }
            case StatusTypes.Resolved: {
                this.element.nativeElement.classList.add('status-resolved');
                break;
            }
            case StatusTypes.Testing: {
                this.element.nativeElement.classList.add('status-testing');
                break;
            }
            case StatusTypes.Closed: {
                this.element.nativeElement.classList.add('status-closed');
                break;
            }
        }
    }
}