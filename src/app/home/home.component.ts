import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo/todo.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	title: any;
	refresh: boolean = false;

	constructor(private todoService: TodoService) {}

	ngOnInit() {}

	addTodo() {
		if (this.title) {
			this.todoService.createTodo(this.title).subscribe((todo) => {
				this.title = ""
				this.refresh = true;
			})
		}
	}
}
