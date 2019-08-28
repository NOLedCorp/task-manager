import { PipeTransform, Pipe } from '@angular/core';
import { RoleTypes } from '../models/project.model';

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform{
    transform(value: string, many: boolean = false){
        if(!many){
            value = value.split(',')[0];
            return this.getValue(value);
        }else{
            let roles = value.split(',');
            roles.forEach(x => {
                x = this.getValue(x);
            });

            return roles.join(' • ');

        }
        
    }

    getValue(value){
        switch(value){
            case RoleTypes.TeamLead: {
                return 'Лидер команды'
            }
            case RoleTypes.ClientManager: {
                return 'Менеджер по работе с клиентами'
            }
            case RoleTypes.Designer: {
                return 'Дизайнер'
            }
            case RoleTypes.Developer: {
                return 'Разработчик'
            }
            case RoleTypes.Tester: {
                return 'Тестировщик'
            }
        }
    }
}