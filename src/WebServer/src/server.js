const express = require('express');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 3000;

let clients = new Map();
let users = new Map();

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
	const clientID = generateClientId();
	clients.set(clientID, socket);

	console.log(`Client Connected: ${clientID}`)

	sendMessage(socket, 'SET_ID', clientID);
	sendMessage(socket, 'UPDATE_CARDS', cards);
	//sendMessage(socket, 'UPDATE_USERS', Object.fromEntries(users.entries()));

	socket.on('message', (messageBuffer) => {
		const message = JSON.parse(deBuffer(messageBuffer));
		console.log(`Recieved message: ${deBuffer(messageBuffer)}`);

		switch (message.command) {
			case 'USER_DATA':
				users.set(clientID, message.data);
				broadcastClients();
				return;
			case 'PICK_CARD':
				broadcastClients();
				return;
		}
	})

	socket.on('close', () => {
		clients.delete(clientID);
		users.delete(clientID);
		console.log(`Client Disconnected: ${clientID}`);
	})
});

function deBuffer(buffer) {
	return Buffer.from(buffer).toString('utf-8');
}

function sendMessage(client, command, message) {
	client.send(JSON.stringify({
		command: command,
		data: message,
	}));
}

function broadcastClients() {
	const message = Object.fromEntries(users.entries());
	clients.forEach((client) => {
		sendMessage(client, 'UPDATE_USERS', message);
	});
}

function generateClientId() {
	return Math.random().toString(36).substr(2, 8);
}

