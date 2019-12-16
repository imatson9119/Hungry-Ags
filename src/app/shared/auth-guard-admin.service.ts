// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ControllerService } from './controller.service';

@Injectable()
export class AuthGuardAdminService implements CanActivate {
  constructor(public router: Router, public controllerService: ControllerService) {}
  canActivate(): boolean {
    if (!this.controllerService.admin) {
      this.router.navigateByUrl('/not-authorized');
      return false;
    }
    return true;
  }
}