import { CanActivate, Router } from '@angular/router';
import { UserUtil } from 'src/app/utils/user.util'
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdmGuard implements CanActivate {

    constructor(
        private router: Router,
        private toastr: ToastrService
    ) {
    }

    canActivate() {
        const user = UserUtil.get();
        if (!user.roles.includes("ADM")) {
            this.toastr.error("Você não tem permissão para executar essa ação.");
            this.router.navigate(["/home"]);
            return false;
        }
        return true;
    }
}