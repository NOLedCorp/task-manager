import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Filter, FilterType, TaskTypes, PriorityTypes, StatusTypes, FilterOption } from '../models/project.model';

@Component({
  selector: 'task-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input('filters') filterHeaders: FilterType[];
  @Input('items') itemsToFilter: any = [];

  @Output() onFilter = new EventEmitter<any>();
  filtered: any = [];
  filters = {};

  
  constructor() {
   }

  ngOnChanges(ch){
    if(ch.itemsToFilter){
      this.setFilters();
      this.filter();
      this.onFilter.emit(this.filtered);
    }
  }
  ngOnInit() {
    if(this.itemsToFilter.length){
      this.setFilters();
      this.filter();
      this.onFilter.emit(this.filtered);
    }
    
  }

  setFilters(items = this.itemsToFilter){
    this.filterHeaders.forEach(h => {
      this.filters[h]={};
      let options = items.map(x => x[h]);
      this.filters[h] = options.reduce((acc, el) => {
        if(!acc[el]){
          acc[el] = {}
        }
        if(!acc[el].Name){
          acc[el].Name = el;
        }
        acc[el].Number = (acc[el].Number || 0) + 1;
        acc[el].Active = acc[el].Active!=undefined?acc[el].Active: this.getActive(h, el);
        return acc;
      }, {})
    })


  }

  countNumbers(items, options){
    for (let k in options){
      options[k].Number = 0;
    }
    return items.reduce((acc, el) => {
      acc[el].Number = (acc[el].Number || 0) + 1;
      return acc;
    }, options)
  }

  getActive(fName, oName){
    return false
  }

  activateFilter(name, option){
    this.filters[name][option].Active = !this.filters[name][option].Active; 
    this.filter();
    this.onFilter.emit(this.filtered);
  }


  getOptions(filter){
    return Object.values(filter);
  }


filter(){
  let active = false
  this.filtered = this.itemsToFilter.filter(item => {
    
    let res = false;
    for (let k in this.filters){
      let activeOptions = (<any>Object.values(this.filters[k])).filter(x => x.Active);
      active = active?active:activeOptions.length>0;
      res = activeOptions.every(x => x.Name == item[k]);
      if(!res){
        return res;
      }
    }

    return res;
  });
  if(!active){
    this.filtered = JSON.parse(JSON.stringify(this.itemsToFilter));
  }
  for (let k in this.filters){
    this.countNumbers(this.filtered.map(x => x[k]), this.filters[k]);
  }
}

}
