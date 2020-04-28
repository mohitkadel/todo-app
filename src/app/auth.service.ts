import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { User } from './users/user.model';


class LoginResponse {
    data: User;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSubject: BehaviorSubject < User > ;
    public user: Observable < User > ;

    // error: string;

    public get userValue(): User {
        return this.userSubject.value;
    }

    get token(): string {
        if (this.userValue) {
            return JSON.parse(localStorage.getItem('token'));
        }
        return null
    }

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject < User > (JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    /**
     * Save user data in localstorage once successfully logged in.
     * @param {[type]} res [description]
     */
    makeLogin(res) {
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', JSON.stringify(res.token));
        this.userSubject.next(res.data);
    }

    /**
     * Update user in behavior subject
     * @param {[type]} res [description]
     */
    updateUserInfo(res) {
        this.userSubject.next(res);
    }

    /**
     * Login API call 
     * @param {[object]} body
     */
    login(body) {
        return this.http.post("/login", body)
            .pipe(map((res: LoginResponse) => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                this.makeLogin(res);
                return res.data;
            }));
    }

    signup(body) {
        return this.http.post("/signup", body)
            .pipe(map((res: LoginResponse) => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                this.makeLogin(res);
                return res.data;
            }));
    }

    /**
     * Delete user date from local storage to logout user
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
}
