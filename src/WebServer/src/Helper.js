
const Helper = () => {
	function generateClientId() {
		return Math.random().toString(36).substr(2, 8);
	}

	function deBuffer(buffer) {
		return Buffer.from(buffer).toString('utf-8');
	}

	function sendMessage(client, command, message) {
		client.send(JSON.stringify({
			command: command,
			data: message,
		}));
	}

	function broadcastClients(clients, users) {
		const message = Object.fromEntries(users.entries());
		clients.forEach((client) => {
			sendMessage(client, 'UPDATE_USERS', message);
		});
	}
}
//export default Helper;
