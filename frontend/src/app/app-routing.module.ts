import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { AdminLoginComponent } from './pages/admin-login/admin-login.component'
import { ErrorComponent } from './pages/error/error.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component'
import { NewStudentComponent } from './pages/new-student/new-student.component'
import { NewStudentGuard } from './services/new-student.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newStudent',
    component: NewStudentComponent,
    canActivate: [NewStudentGuard],
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'logincallback',
    component: LoginCallbackComponent,
  },
  {
    path: 'adminlogin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'error',component:ErrorComponent
  },
  { path: '**', component:ErrorComponent },
]

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
