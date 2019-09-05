import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { TaskTypes, StatusTypes, ProjectStatus } from '../models/project.model';

@Directive({
    selector:'[status]'
})
export class StatusDirective implements OnInit, OnChanges{
    @Input('status') status:string;
    constructor(private element:ElementRef){
        
        
    }
    ngOnChanges(){
        this.clear();
        console.log(this.element.nativeElement.className);
        this.set();
    }
    ngOnInit(){
        this.set();
    }

    private set(){
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
            case ProjectStatus.Planning: {
                this.element.nativeElement.classList.add('status-proposed');
                break;
            }
            case ProjectStatus.Frozen: {
                this.element.nativeElement.classList.add('status-frozen');
                break;
            }
        }
    }

    private clear(){
        this.element.nativeElement.classList.remove(
            'status-active','status-resolved','status-testing','status-closed','status-proposed','status-frozen'
        )
    }
}