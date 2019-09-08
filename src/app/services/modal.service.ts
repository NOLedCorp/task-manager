import { ElementRef, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';

export class ModalService{
    public input:any;
    public header:string;
    public modal:ViewContainerRef;
    private _show:boolean = false;

    get show() {return this._show};

    constructor(private componentFactoryResolver:ComponentFactoryResolver){}

    open(component: Type<any>, header = 'Заголовок модального окна', input?){
        this.modal.clear();
        let bookItemComponent = this.componentFactoryResolver.resolveComponentFactory(component);
        let bookItemComponentRef = this.modal.createComponent(bookItemComponent);
        this._show=true;
        this.header = header;

        // (<any>bookItemComponentRef.instance).value = {
        //     title: 'Great Expectations',
        //     author: 'Charles Dickens'
        // };
    }

    close(){
        this._show=false;
        this.modal.clear();
    }
}