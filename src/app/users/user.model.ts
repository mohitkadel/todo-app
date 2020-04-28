export class Role {
	static Admin: number = 1;
	static User: number = 2;
}

export class User {
	private __id: string;
	private _email: string;
	private _name: string;
	private _status: boolean;
	private _role: number;
	private _created_at: string;
	private _updated_at: string;

	constructor(user) {
		this.__id = user._id;
		this._email = user.email
		this._name = user.name
		this._status = user.status
		this._role = user.role
		this._created_at = user.created_at
		this._updated_at = user.updated_at
	}

	get id() {
		return this.__id;
	}

	get status() {
		return this._status ? 'Active' : 'InActive'
	}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	get created_at() {
		return this._created_at;
	}

	get role() {
		return this._role;
	}
}
