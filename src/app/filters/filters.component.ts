import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Filter, FilterType, TaskTypes, PriorityTypes, StatusTypes, FilterOption } from '../models/project.model';

@Component({
  selector: 'task-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input('filters') filterHeaders: FilterType[];
  @Input('items') itemsToFilter: any = [];
  filters = {};

  
  constructor() {
   }

  ngOnChanges(ch){
    if(ch.itemsToFilter){
      this.setFilters();
    }
  }
  ngOnInit() {
    if(this.itemsToFilter.length){
      this.setFilters();
    }
    
  }

  setFilters(){
    this.filterHeaders.forEach(h => {
      this.filters[h]={};
      let options = this.itemsToFilter.map(x => x[h]);
      this.filters[h] = options.reduce((acc, el) => {
        if(!acc[el]){
          acc[el] = {}
        }
        if(!acc[el].Name){
          acc[el].Name = el;
        }
        acc[el].Number = (acc[el].Number || 0) + 1;
        acc[el].Active = this.getActive(h, el);
        return acc;
      }, {})
    })


  }

  getActive(fName, oName){
    return false
  }

  activateFilter(name, option){
    this.filters[name][option].Active = !this.filters[name][option].Active; 
  }


  getOptions(filter){

    return Object.values(filter);
  }

}
