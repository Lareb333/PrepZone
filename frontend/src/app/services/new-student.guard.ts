import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NewStudentGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const viaNavigate =
      this.router.getCurrentNavigation()?.extras.state?.['viaNavigate'] || false
    if (viaNavigate) {
      return true
    } else {
      return this.router.createUrlTree(['/logincallback'])
    }
  }
}
