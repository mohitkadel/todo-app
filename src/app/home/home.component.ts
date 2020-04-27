import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	title: any;

	todos: any;

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.getAllTodo();
	}

	addTodo() {
		if (this.title) {
			this.todoService.createTodo(this.title).subscribe((todo) => {
				this.title = ""
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
		if(todo.completed) {
			todo.completed = false
		}
		else {
			todo.completed = true
		}

		this.todoService.updateTodo(todo._id, { completed: todo.completed }).subscribe((todo) => {
			this.getAllTodo();
		});
	}

	updateTodo(item: any) {
		this.todoService.updateTodo(item._id, { title: item.title }).subscribe((todo) => {
			this.getAllTodo();
		});
	}

	remove(id) {
		this.todoService.removeTodo(id).subscribe(() => {
			this.getAllTodo();
		});
	}
}
