//import Helper from "./Helper";
const express = require('express');
const WebSocket = require('ws');
//const Helper = require('./Helper.js');

const hostname = '127.0.0.1';
const port = 3000;

let clients = new Map();
let users = new Map();
let userCards = new Map();
let room = {
	id: "newroom1",
	roundState: "play", // play, display
}

// play
// on receive show results: send message with all chosen cards
// on receive reset round: set play

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
	// TODO: Update status to play if username existed before
	const clientID = generateClientID();
	clients.set(clientID, socket);

	console.log(`Client Connected: ${clientID}`);

	sendMessage(socket, 'SET_ID', clientID);
	sendMessage(socket, 'UPDATE_CARDS', cards);
	sendMessage(socket, 'UPDATE_ROOM', room);
	if (room.roundState == 'display') sendMessage(socket, 'REVEAL', mapToObject(userCards));
	//sendMessage(socket, 'UPDATE_USERS', mapToObject(users));

	socket.on('message', (messageBuffer) => {
		const message = JSON.parse(deBuffer(messageBuffer));
		console.log(`Recieved message: ${JSON.stringify(message)}`);

		if (room.roundState === 'play') receivedplayMessage(clientID, message);
		else if (room.roundState === 'display') receivedDisplayMessage(clientID, message);
	})

	socket.on('close', () => {
		console.log(`Client Disconnected: ${clientID}`);
		clients.delete(clientID);
		//users.delete(clientID);
		let user = users.get(clientID);
		user.status = 'Disconnected';
		users.set(clientID, user);
		broadcastUsers();
	})
});

const receivedplayMessage = (clientID, message) => {
	switch (message.command) {
		case 'USER_DATA':
			users.set(clientID, message.data);
			broadcastUsers();
			return;
		case 'PICK_CARD':
			if (userCards.has(clientID)) return;

			let user = users.get(clientID);
			user.status = 'Complete';
			users.set(clientID, user);
			userCards.set(clientID, message.data);

			broadcastUsers();
			return;
		case 'END_ROUND':
			setRoundState('display');
			broadcastUserCards();
			return;
	}
}

const receivedDisplayMessage = (clientID, message) => {
	switch (message.command) {
		case 'USER_DATA':
			users.set(clientID, message.data);
			broadcastUsers();
			return;
		case 'NEW_ROUND':
			setRoundState('play');
			userCards = new Map();
			broadcastNewRound();
			setAllClientStatus('Selecting');
			return;
	}
}








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
	console.log(`broadcastUserCards: `, message);
	clients.forEach((client) => {
		sendMessage(client, 'REVEAL', message);
		sendMessage(client, 'UPDATE_ROOM', room);
	});
}

function setRoundState(state) {
	room.roundState = state;

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
		user.status = status;
		users.set(key, user);
	}
	broadcastUsers();
}
