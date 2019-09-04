import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Формы
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Модальные окна
import { ModalModule, BsModalService } from 'ngx-bootstrap';
// import { ModalComponent } from './modal/modal.component';
// import { ModalService } from './services/modal.service';

//HTTP запросы
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { UserGuard } from './guards/user.guard';
import { ApiInterceptor } from './api.interceptor';
import { UserService } from './services/user.service';
import { ProjectGuard } from './guards/project.guard';
import { GitHubService } from './services/github.service';
import { StatusDirective } from './directives/status.directive';
import { TaskDirective } from './directives/task.directive';
import { PriorityDirective } from './directives/priority.directive';
import { RolePipe } from './pipes/role.pipe';
import { LoadComponent } from './load/load.component';
import { LoadService } from './services/load.service';
import { FilterPipe } from './pipes/filter.pipe';
import { ProjectsComponent } from './app-project/projects/projects.component';
import { ProjectComponent } from './app-project/project/project.component';
import { WorkComponent } from './app-task/work/work.component';
import { NotificationsComponent } from './app-notify/notifications/notifications.component';
import { NotificationComponent } from './app-notify/notification/notification.component';
import { ProjectReviewComponent } from './app-project/project-review/project-review.component';
import { ProjectRequirementsComponent } from './app-project/project-requirements/project-requirements.component';
import { TeamComponent } from './app-project/team/team.component';
import { TaskComponent } from './app-task/task/task.component';
import { WorkItemComponent } from './app-task/work-item/work-item.component';
import { ProjectCardComponent } from './app-project/project-card/project-card.component';
import { FiltersComponent } from './app-project/filters/filters.component';
import { TaskInfoComponent } from './app-task/task-info/task-info.component';
import { TaskLinksComponent } from './app-task/task-links/task-links.component';
import { TaskMessagerComponent } from './app-task/task-messager/task-messager.component';
import { TaskHistoryComponent } from './app-task/task-history/task-history.component';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    ProjectsComponent,
    ProjectComponent,
    WorkComponent,
    NotificationsComponent,
    NotificationComponent,
    ProjectReviewComponent,
    ProjectRequirementsComponent,
    TeamComponent,
    TaskComponent,
    WorkItemComponent,
    StatusDirective,
    TaskDirective,
    PriorityDirective,
    RolePipe,
    FilterPipe,
    ProjectCardComponent,
    FiltersComponent,
    LoadComponent,
    TaskInfoComponent,
    TaskLinksComponent,
    TaskMessagerComponent,
    TaskHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserGuard,
    ProjectGuard,
    UserService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    HttpClient,
    GitHubService,
    LoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
