import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TokenGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const token = localStorage.getItem('AuthToken') ?? "";
        
        if (!token || token == "") {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}