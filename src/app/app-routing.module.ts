import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { ProjectsComponent } from './app-project/projects/projects.component';
import { ProjectComponent } from './app-project/project/project.component';
import { WorkComponent } from './app-task/work/work.component';
import { NotificationsComponent } from './app-notify/notifications/notifications.component';
import { ProjectReviewComponent } from './app-project/project-review/project-review.component';
import { ProjectRequirementsComponent } from './app-project/project-requirements/project-requirements.component';
import { TeamComponent } from './app-project/team/team.component';
import { TaskComponent } from './app-task/task/task.component';
import { UserGuard } from './guards/user.guard';
import { ProjectGuard } from './guards/project.guard';
import { TaskInfoComponent } from './app-task/task-info/task-info.component';
import { TaskLinksComponent } from './app-task/task-links/task-links.component';
import { TaskMessagerComponent } from './app-task/task-messager/task-messager.component';
import { TaskHistoryComponent } from './app-task/task-history/task-history.component';

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
  {path: 'work-item/:workId', component: TaskComponent, children: taskRouts}
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
