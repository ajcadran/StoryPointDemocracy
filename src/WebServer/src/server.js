const express = require('express');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 3000;

let clients = new Map();
let users = new Map();
let userCards = new Map();
let room = {
	id: "newroom1",
	roundState: "play", // play, reveal
}

let cards = [
	{
		id: 0,
		value: 0,
	},
	{
		id: 1,
		value: 1,
	},
	{
		id: 2,
		value: 2,
	},
	{
		id: 3,
		value: 3,
	},
	{
		id: 4,
		value: 5,
	},
	{
		id: 5,
		value: 8,
	},
	{
		id: 6,
		value: 13,
	},
	{
		id: 7,
		value: 20,
	},
];

const app = express();
const server = app.listen(port, () => {
	console.log('Server is running on http://localhost:3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
	var clientID = generateClientID();
	clients.set(clientID, socket);

	console.log(`Client Connected: ${clientID}`);

	sendMessage(socket, 'UPDATE_CARDS', cards);
	sendMessage(socket, 'UPDATE_ROOM', room);
	if (room.roundState === 'reveal') broadcastUserCards();

	socket.on('message', (messageBuffer) => {
		const message = JSON.parse(deBuffer(messageBuffer));
		console.log(`Recieved message: ${JSON.stringify(message)}`);

		clientID = receivedMessage(socket, clientID, message);
	})

	socket.on('close', () => {
		console.log(`Client Disconnected: ${clientID}`);
		clients.delete(clientID);
		setUserStatus(clientID, 'Disconnected');
		broadcastUsers();
	})
});

const receivedMessage = (socket, clientID, message) => {
	switch (message.command) {
		case 'USER_DATA':
			if (message.data.id != null) {
				updateClientID(clientID, message.data.id);
				clientID = message.data.id;
			} else sendMessage(socket, 'SET_ID', clientID);

			users.set(clientID, message.data);
			broadcastUsers();
			return clientID;
		case 'USER_PROFILE':
			users.set(clientID, message.data);
			broadcastUsers();
			return clientID;
		case 'PICK_CARD':
			if (userCards.has(clientID)) return;

			setUserStatus(clientID, 'Complete');
			userCards.set(clientID, message.data);

			broadcastUsers();
			return clientID;
		case 'END_ROUND':
			setRoundState('reveal');
			broadcastUserCards();
			return clientID;
		case 'NEW_ROUND':
			setRoundState('play');
			userCards = new Map();
			broadcastNewRound();
			setAllClientStatus('Selecting');
			return clientID;
	}
}


// Send Messages ------------------------------------------------------------------------

function sendMessage(client, command, message) {
	client.send(JSON.stringify({
		command: command,
		data: message,
	}));
}

function sendMessageFromID(clientID, command, message) {
	clients.get(clientID).send(JSON.stringify({
		command: command,
		data: message,
	}));
}

function broadcastNewRound() {
	clients.forEach((client) => {
		sendMessage(client, 'NEW_ROUND', {});
	});
}

function broadcastUsers() {
	const message = mapToObject(users);
	clients.forEach((client) => {
		sendMessage(client, 'UPDATE_USERS', message);
	});
}

function broadcastUserCards() {
	const message = mapToObject(userCards);
	clients.forEach((client) => {
		sendMessage(client, 'REVEAL', message);
		sendMessage(client, 'UPDATE_ROOM', room);
	});
}

function setRoundState(state) {
	room.roundState = state;

}

function updateClientID(prevID, newID) {
	const socket = clients.get(prevID);
	clients.set(newID, socket);
	clients.delete(prevID);

	const user = users.get(prevID);
	if (user) {
		users.set(newID, user);
		users.delete(prevID);
	}
}

// Tools ---------------------------------------------------------------------------------------------------------------

function generateClientID() {
	return Math.random().toString(36).substr(2, 8);
}

function deBuffer(buffer) {
	return Buffer.from(buffer).toString('utf-8');
}

function mapToObject(map) {
	return Object.fromEntries(map.entries());
}

function setAllClientStatus(status) {
	for (const [key, user] of users) {
		if (user.status != 'Disconnected') {
			user.status = status;
			users.set(key, user);
		}
	}
	broadcastUsers();
}

function setUserStatus(clientID, status) {
	let user = users.get(clientID);
	user = {
		...user,
		status: status,
	}
	users.set(clientID, user);
}
