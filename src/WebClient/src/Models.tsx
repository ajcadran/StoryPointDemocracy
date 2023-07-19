
export class UserModel {
	id: string;
	username: string;
	color: string;
	status: string;

	constructor(id, username, color, status) {
		this.id = id;
		this.username = username;
		this.color = color;
		this.status = status;
	}
}
export class RoomModel {
	id: string;
	roundState: string;
	cards: CardModel[];
}
export class CardModel {
	id: number;
	value: number | string;
	show: boolean;
}
