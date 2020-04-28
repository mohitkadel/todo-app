import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

class Login {
	email: string;
	password: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	error: any;

	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		) {}

	ngOnInit() {}

	/**
	 * Submit login form
	 */
	onSubmit() {
		if (this.loginForm.valid) {
			let login = new Login();
			login.email = this.loginForm.value.email;
			login.password = this.loginForm.value.password;
			
		}

	}
}
