const express = require('express');
const WebSocket = require('ws');

// Const ---------------------------------------------------------------------------------------------------
const hostname = '127.0.0.1';
const port = 3000;

const scrumCards = [
	{
		id: 0,
		value: 0,
		show: true,
	},
	{
		id: 1,
		value: '1/2',
		show: true,
	},
	{
		id: 2,
		value: 1,
		show: true,
	},
	{
		id: 3,
		value: 2,
		show: true,
	},
	{
		id: 4,
		value: 3,
		show: true,
	},
	{
		id: 5,
		value: 5,
		show: true,
	},
	{
		id: 6,
		value: 8,
		show: true,
	},
	{
		id: 7,
		value: 13,
		show: true,
	},
	{
		id: 8,
		value: 20,
		show: true,
	},
	{
		id: 9,
		value: 40,
		show: true,
	},
	{
		id: 10,
		value: 100,
		show: true,
	},
	{
		id: 11,
		value: '?',
		show: true,
	},
];

// Vars ----------------------------------------------------------------------------------------------------
let clients = new Map();
let users = new Map();
let userCards = new Map();
let room = {
	id: "newroom1",
	roundState: "play", // play, reveal
	cards: scrumCards,
}

const app = express();
const server = app.listen(port, () => {
	console.log('Server is running on http://localhost:3000');
});

const wss = new WebSocket.Server({ server });

// Client --------------------------------------------------------------------------------------------------
wss.on('connection', (socket) => {
	var clientID = generateClientID();
	clients.set(clientID, socket);

	console.log(`Client Connected: ${clientID}`);

	sendMessage(socket, 'UPDATE_CARDS', room.cards);
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
		case 'SEND_ROOM_CARDS':
			room.cards = message.data;
			broadcastRoomCards();
			return clientID;
		case 'DELETE_DEAD_USERS': // DEBUG
			deleteDisconnectedClients();
			broadcastUsers();
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

function broadcastRoomCards() {
	clients.forEach((client) => {
		sendMessage(client, 'UPDATE_CARDS', room.cards);
	});
}

function broadcastUsers() {
	// TODO: Remove all dead users (No data, but still showing in user list)
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

function deleteDisconnectedClients() {
	for (const clientID of users.keys()) {
		if (users.get(clientID).status === "Disconnected" || users.get(clientID).status === null) {
			clients.delete(clientID);
			users.delete(clientID);
		}
	}
}
