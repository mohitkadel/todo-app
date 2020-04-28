import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) {}

	getAllUsers() {
		return this.http.get('/users')
		.pipe(map((res: User[]) => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                let users: User[] = [];
				for (let user of res) {
					users.push(new User(user))
				}
				return users;
            }));;
	}
}
