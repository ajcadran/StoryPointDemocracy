import React from "react";
import { useEffect, useState } from "react";

const ServerConnectionManager = ({ currentUser, chosenCard }) => {

    const [socket, setSocket] = useState(new WebSocket('ws://localhost:3000'));

    useEffect(() => {
		if (!socket) return;

		socket.onmessage = (event) => {
			console.log(event.data);
		}
	}, [socket]);
    

    useEffect(() => {
		if (!chosenCard || chosenCard === -1) return;

		socket.send('Pick:'+chosenCard);
	}, [socket]);

	function newConnection() {
		const newSocket = new WebSocket('ws://localhost:3000');
    	setSocket(newSocket);

		return () => {
			newSocket.close();
		}
	}

	return (<></>);
}

export default ServerConnectionManager;
