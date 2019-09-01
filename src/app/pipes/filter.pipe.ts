import { PipeTransform, Pipe } from '@angular/core';
import { RoleTypes, FilterType, TaskTypes, PriorityTypes, StatusTypes } from '../models/project.model';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform{
    transform(value: string){
        return this.getValue(value);
        
    }

    getValue(value: string){
        switch(value.toLowerCase()){
            case FilterType.Type: {
                return 'Тип'
            }
            case FilterType.Priority: {
                return 'Приоритет'
            }
            case FilterType.Status: {
                return 'Статус'
            }
            case FilterType.AssignToMe: {
                return 'Назначено мне'
            }
            case '0': {
                return 'нет'
            }
            case '1': {
                return 'да'
            }
            case TaskTypes.Requirement: {
                return 'требование'
            }
            case TaskTypes.Task: {
                return 'задача'
            }
            case TaskTypes.Bug: {
                return 'баг'
            }
            case PriorityTypes.Critical: {
                return 'критичный'
            }
            case PriorityTypes.High: {
                return 'высокий'
            }
            case PriorityTypes.Medium: {
                return 'средний'
            }
            case PriorityTypes.Low: {
                return 'низкий'
            }
            case StatusTypes.Proposed: {
                return 'назначен'
            }
            case StatusTypes.Active: {
                return 'активен'
            }
            case StatusTypes.Resolved: {
                return 'решен'
            }
            case StatusTypes.Testing: {
                return 'на тестировании'
            }
            case StatusTypes.Closed: {
                return 'закрыт'
            }
            default: {
                return value
            }
        }
    }
}