import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	users: User[];
	selectedUserId: string;
	constructor(private userService: UserService) {}

	ngOnInit() {
		this.getAllUsers();
	}

	getAllUsers() {
		this.userService.getAllUsers().subscribe((users: User[]) => {
			this.users = users;
		})
	}
}
