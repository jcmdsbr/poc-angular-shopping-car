import { CanActivate, Router } from '@angular/router';
import { UserUtil } from 'src/app/utils/user.util'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) {
    }

    canActivate() {
        const user = UserUtil.get();
        if (!user) {
            this.router.navigate(["/login"]);
            return false;
        }

        return true;
    }
}