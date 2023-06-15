//import Helper from "./Helper";
const express = require('express');
const WebSocket = require('ws');
//const Helper = require('./Helper.js');

const hostname = '127.0.0.1';
const port = 3000;

let clients = new Map();
let users = new Map();
let userCards = new Map();
let roundState = "selecting"; // selecting, displaying

// selecting
// on receive show results: send message with all chosen cards
// on receive reset round: set selecting

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
	// TODO: Update status to selecting if username existed before
	const clientID = generateClientID();
	clients.set(clientID, socket);

	console.log(`Client Connected: ${clientID}`);

	sendMessage(socket, 'SET_ID', clientID);
	sendMessage(socket, 'UPDATE_CARDS', cards);
	//sendMessage(socket, 'UPDATE_USERS', mapToObject(users));

	socket.on('message', (messageBuffer) => {
		const message = JSON.parse(deBuffer(messageBuffer));
		console.log(`Recieved message: ${JSON.stringify(message)}`);

		if (roundState === 'selecting') receivedSelectingMessage(clientID, message);
		else if (roundState === 'displaying') receivedDisplayMessage(clientID, message);
	})

	socket.on('close', () => {
		console.log(`Client Disconnected: ${clientID}`);
		clients.delete(clientID);
		users.delete(clientID);
		broadcastUsers();
	})
});

const receivedSelectingMessage = (clientID, message) => {
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
			roundState = 'displaying';
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
			roundState = 'selecting';
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
	});
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
