import { Component, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {

	todos: any;
	selectedUserId: string;
	@Input() refresh: boolean;
	@Input() userId: string;

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.getAllTodo();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.refresh) {
			this.getAllTodo();
		}

		if (changes.userId && changes.userId.currentValue) {
			this.getAllTodo({ created_by: changes.userId.currentValue });
		}
		console.log('changes')
		console.log(changes)
	}

	getAllTodo(query = {}) {
		this.todoService.getAllTodo(query).subscribe((todos) => {
			this.todos = todos;
		})
	}

	onStatusChange(todo) {
		if (todo.completed) {
			todo.completed = false
		} else {
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
