import { Component, OnInit } from '@angular/core';
import { Filter, FilterType, TaskTypes, PriorityTypes, StatusTypes } from '../models/project.model';

@Component({
  selector: 'task-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent implements OnInit {
  filters:Filter[] = [
    {
      Type: FilterType.Type,
      Options: [
        {
          Name: TaskTypes.Requirement,
          Number: 3,
          Active: false
        },
        {
          Name: TaskTypes.Task,
          Number: 0,
          Active: false
        },
        {
          Name: TaskTypes.Bug,
          Number: 3,
          Active: false
        }
      ]
    },
    {
      Type: FilterType.Priority,
      Options: [
        {
          Name: PriorityTypes.Critical,
          Number: 1,
          Active: false
        },
        {
          Name: PriorityTypes.High,
          Number: 10,
          Active: false
        },
        {
          Name: PriorityTypes.Medium,
          Number: 3,
          Active: false
        },
        {
          Name: PriorityTypes.Low,
          Number: 0,
          Active: false
        }
      ]
    },
    {
      Type: FilterType.Status,
      Options: [
        {
          Name: StatusTypes.Proposed,
          Number: 17,
          Active: false
        },
        {
          Name: StatusTypes.Active,
          Number: 3,
          Active: false
        },
        {
          Name: StatusTypes.Resolved,
          Number: 0,
          Active: false
        },
        {
          Name: StatusTypes.Testing,
          Number: 3,
          Active: false
        },
        {
          Name: StatusTypes.Closed,
          Number: 30,
          Active: false
        },
      ]
    },
    {
      Type: FilterType.AssignToMe,
      Options: [
        {
          Name: 'yes',
          Number: 3,
          Active: true
        },
        {
          Name: 'no',
          Number: 30,
          Active: false
        }
      ]
    },
  ]
  constructor() { }

  ngOnInit() {
    console.log(this.filters)
  }

}
