import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/services/auth.guard'
import { JeeDashboardComponent } from './student-dashboard/jee-dashboard/jee-dashboard.component'
import { NeetDashboardComponent } from './student-dashboard/neet-dashboard/neet-dashboard.component'
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component'
import { StudentNotesComponent } from './student-notes/student-notes.component'
import { StudentResultDetailComponent } from './student-result/student-result-detail/student-result-detail.component'
import { StudentResultListComponent } from './student-result/student-result-list/student-result-list.component'
import { StudentResultComponent } from './student-result/student-result.component'
import { StudentSettingsComponent } from './student-settings/student-settings.component'
import { StudentGiveTestComponent } from './student-test/student-give-test/student-give-test.component'
import { StudentTestListComponent } from './student-test/student-test-list/student-test-list.component'
import { StudentTestComponent } from './student-test/student-test.component'
import { StudentComponent } from './student.component'

const routes: Routes = [
  {
    path:'',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
        children: [
          { path: '', redirectTo: 'jee', pathMatch: 'full' },
          {
            path: 'jee',
            component: JeeDashboardComponent,
          },
          {
            path: 'neet',
            component: NeetDashboardComponent,
          },
          { path: '**', redirectTo: 'jee' },
        ],
      },
      {
        path: 'notes',
        component: StudentNotesComponent,
      },
      {
        path: 'test',
        component: StudentTestComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: StudentTestListComponent,
          },
          {
            path: ':id',
            component: StudentGiveTestComponent,
          },
          { path: '**', redirectTo: 'list' },
        ],
      },
      {
        path: 'settings',
        component: StudentSettingsComponent,
      },
      {
        path: 'result',
        component: StudentResultComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: StudentResultListComponent,
          },
          {
            path: ':id',
            component: StudentResultDetailComponent,
          },
          { path: '**', redirectTo: 'list' },
        ],
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }
