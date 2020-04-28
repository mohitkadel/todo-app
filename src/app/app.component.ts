import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service'
import { User } from './user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'todo-app';

	private _user: User;

    constructor(
    	private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
    	this.authService.user.subscribe(user => {
            if (user) {
                this._user = new User(user)
            } else
                this._user = user
        });
    }

    /**
     * Logout user
     */
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    get user() {
        return this._user;
    }
}
