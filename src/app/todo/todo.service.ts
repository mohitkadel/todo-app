import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TodoService {

	constructor(private http: HttpClient) {}

	createTodo(title) {
		return this.http.post('/todos', { title: title });
	}

	getAllTodo(query) {
		return this.http.get('/todos', { params: query });
	}

	updateTodo(id, body) {
		return this.http.put('/todos/' + id, body);
	}

	removeTodo(id) {
		return this.http.delete('/todos/' + id);
	}
}
