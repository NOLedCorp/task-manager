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
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { WorkComponent } from './work/work.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectReviewComponent } from './project-review/project-review.component';
import { ProjectRequirementsComponent } from './project-requirements/project-requirements.component';
import { TeamComponent } from './team/team.component';
import { RequirementComponent } from './requirement/requirement.component';
import { TaskComponent } from './task/task.component';
import { UserGuard } from './user.guard';
import { ApiInterceptor } from './api.interceptor';
import { UserService } from './services/user.service';

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
    RequirementComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
