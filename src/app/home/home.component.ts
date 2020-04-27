import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	todo: any;

	todos: any;

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.getAllTodo();
	}

	addTodo() {
		if (this.todo) {
			this.todoService.createTodo(this.todo).subscribe((todo) => {
				this.todo = ""
				this.getAllTodo();
			})
		}
	}

	getAllTodo() {
		this.todoService.getAllTodo().subscribe((todos) => {
			this.todos = todos;
		})
	}

	onStatusChange(todo) {
		if(todo.status == 'Completed') {
			todo.status = 'Active'
		}
		else {
			todo.status = 'Completed'
		}

		this.todoService.updateTodo(todo._id, { status: todo.status }).subscribe((todo) => {
			this.getAllTodo();
		});
	}

	updateTodo(item: any) {
		this.todoService.updateTodo(item._id, { todo: item.todo }).subscribe((todo) => {
			this.getAllTodo();
		});
	}

	remove(id) {
		this.todoService.removeTodo(id).subscribe(() => {
			this.getAllTodo();
		});
	}
}
