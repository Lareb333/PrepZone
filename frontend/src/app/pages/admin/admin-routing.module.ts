import { Component, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminAuthGuard } from 'src/app/services/admin-auth.guard'
import { AddQuestionComponent } from './add-question/add-question.component'
import { AddPaperComponent } from './add-paper/add-paper.component'
import { AdminComponent } from './admin.component'
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { TestListComponent } from './add-paper/test-list/test-list.component'
import { TestAddComponent } from './add-paper/test-add/test-add.component'
import { AttemptComponent } from './add-paper/attempt/attempt.component'
import { ResultInfoComponent } from './add-paper/result-info/result-info.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'add',
        component: AddQuestionComponent,
      },
      {
        path: 'test',
        component: AddPaperComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: TestListComponent,
          },
          {
            path: 'add',
            component: TestAddComponent,
          },
          {
            path: 'resultList/:id',
            component: AttemptComponent,
          },
          {
            path: 'resultInfo/:id1/:id2/:id3',
            component:ResultInfoComponent ,
          },
          { path: '**', redirectTo: 'list' },
        ],
      },
      {
        path:'notes',
        component: UploadPdfComponent,
      },
      {
        path:'dashboard',
        component: DashboardComponent,
      }
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
