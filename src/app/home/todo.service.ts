import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http: HttpClient) {}

	createTodo(todo) {
		return this.http.post('/todos', { todo: todo });
	}

	getAllTodo() {
		return this.http.get('/todos');
	}

	updateTodo(id, body) {
		return this.http.put('/todos/' + id, body);
	}

	removeTodo(id) {
		return this.http.delete('/todos/' + id);
	}
}
