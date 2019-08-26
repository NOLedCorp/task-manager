import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
