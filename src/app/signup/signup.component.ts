import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
		name: new FormControl(''),
		dob: new FormControl(''),
		gender: new FormControl('')
	});

	errors
	success

	@ViewChild('myForm', {static: false}) myForm: NgForm;


	constructor() {}

	ngOnInit() {}

	onSubmit() {
		if(this.signupForm.valid) {
			let body = {};
			
			body = {
				name: this.signupForm.value.name,
				email: this.signupForm.value.email,
				password: this.signupForm.value.password
			};
			
		}
	}

}
