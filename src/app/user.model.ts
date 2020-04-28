export class User {
	email: string;
	name: string;
	status: boolean;
	created_at: string;
	updated_at: string;

	constructor(user) {
		this.email = user.email
		this.name = user.name
		this.status = user.status
		this.created_at = user.created_at
		this.updated_at = user.updated_at
	}
}
