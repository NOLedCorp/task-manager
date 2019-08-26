import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { WorkComponent } from './work/work.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectReviewComponent } from './project-review/project-review.component';
import { ProjectRequirementsComponent } from './project-requirements/project-requirements.component';
import { TeamComponent } from './team/team.component';
import { RequirementComponent } from './requirement/requirement.component';
import { TaskComponent } from './task/task.component';
import { UserGuard } from './user.guard';

const projectRouts: Routes = [
  {path: '', redirectTo: 'review', pathMatch: 'full'},
  {path: 'review', component: ProjectReviewComponent},
  {path: 'mywork', component: WorkComponent},
  {path: 'requirements', component: ProjectRequirementsComponent},
  {path: 'team', component: TeamComponent},
  {path: 'requirement/:reqId', component: RequirementComponent},
  {path: 'task/:workId', component: TaskComponent},
  {path: 'bug/:workId', component: TaskComponent},
];

const userRouts: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project/:projectId', component: ProjectComponent, children: projectRouts},
  {path: 'work', component: WorkComponent},
  {path: 'notificaions', component: NotificationsComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'user/:userId', component:UserComponent, children: userRouts, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
