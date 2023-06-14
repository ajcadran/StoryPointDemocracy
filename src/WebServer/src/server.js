const express = require('express');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 3000;

let users;

const app = express();
const server = app.listen(port, () => {
	console.log('Server is running on http://localhost:3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
	socket.on('message', (messageBuffer) => {
		console.log('Recieved message:', Buffer.from(messageBuffer).toString('utf-8'));
		socket.send('Hello from node.js!');
	})
});
