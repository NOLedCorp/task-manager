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
import { TaskComponent } from './task/task.component';
import { UserGuard } from './guards/user.guard';
import { ProjectGuard } from './guards/project.guard';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskLinksComponent } from './task-links/task-links.component';
import { TaskMessagerComponent } from './task-messager/task-messager.component';
import { TaskHistoryComponent } from './task-history/task-history.component';

const taskRouts: Routes = [
  {path: '', redirectTo: 'info', pathMatch: 'full'},
  {path: 'info', component: TaskInfoComponent},
  {path: 'links', component: TaskLinksComponent},
  {path: 'messager', component: TaskMessagerComponent},
  {path: 'history', component: TaskHistoryComponent}
];

const projectRouts: Routes = [
  {path: '', redirectTo: 'mywork', pathMatch: 'full'},
  {path: 'review', component: ProjectReviewComponent},
  {path: 'mywork', component: WorkComponent},
  {path: 'requirements', component: ProjectRequirementsComponent},
  {path: 'team', component: TeamComponent},
  {path: 'requirement/:workId', component: TaskComponent, children: taskRouts},
  {path: 'task/:workId', component: TaskComponent, children: taskRouts},
  {path: 'bug/:workId', component: TaskComponent, children: taskRouts},
];

const userRouts: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project/:projectId', component: ProjectComponent, children: projectRouts, canActivate: [ProjectGuard]},
  {path: 'work', component: WorkComponent},
  {path: 'notificaions', component: NotificationsComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'user/:userId', component:UserComponent, children: userRouts, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
