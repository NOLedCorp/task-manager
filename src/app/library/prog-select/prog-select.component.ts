import { Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'prog-select',
  templateUrl: './prog-select.component.html',
  styleUrls: ['./prog-select.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>ProgSelectComponent),
    multi: true
  }]
})
export class ProgSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() items = [];

  /**
   * Поле которое запишется в контрол
   */
  @Input() out:string = 'Id';

  /**
   * Поле, значение которого будет выведено
   */
  @Input() view:string = 'Name';

  /**
   * Поле по которому будет производиться поиск
   */
  @Input() search:boolean = true;
  @Input() errors:any = null;

  value = 0;
  disabled = false;
  showItems = this.items.length?this.items:[]; 
  show = false;
  private onChange = (value: any)=> {};
  private onTouched = () => {};

  @HostListener('document:click', ['$event']) doSth($event){
    if(this.show){
      if($event.target.id!='field' && $event.target.id!='open'){
        this.show=false;
      }
    }
  }
  constructor() { }

  find(elem){
    if(elem.value!=''){
      this.showItems = JSON.parse(JSON.stringify(this.items.filter(x => {
        return x[this.view].indexOf(elem.value)>-1
      })));
    }else{
      this.showItems=JSON.parse(JSON.stringify(this.items));
    }
  }


   
  ngOnInit() {
    
  }

  ngOnChanges(ch:SimpleChanges){
    if(ch.items){
      this.showItems = this.items;
    }
  }

  open(){
    this.show=true;
  }


  /*
    Value Accessor
  */
  registerOnChange(fn:any){
    this.onChange=fn;
  }

  registerOnTouched(fn:any){
    this.onTouched = fn;
  }

  writeValue(out: any){
    this.value = out;
  }

  setDisabledState(isDisabled: boolean){
    this.disabled = isDisabled;
  }

  updateValue(value){
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  get Value() { 
    let res = this.items.find(x => x[this.out]==this.value);
    return res?res[this.view]:''
  };

}
