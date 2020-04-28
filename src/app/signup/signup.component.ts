import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
		name: new FormControl('')
	});

	errors

	@ViewChild('myForm', { static: false }) myForm: NgForm;

	constructor(
		private router: Router,
		private authService: AuthService) {}

	ngOnInit() {}

	onSubmit() {
		if (this.signupForm.valid) {
			let body = {};

			body = {
				name: this.signupForm.value.name,
				email: this.signupForm.value.email,
				password: this.signupForm.value.password
			};
			this.authService.signup(body).subscribe((res) => {
					this.router.navigate(['/']);
				},
				(error) => {
					console.log(error)
					this.errors = error.error.errors
				})
		}
	}
}
