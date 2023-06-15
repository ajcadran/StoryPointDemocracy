import {useEffect, useState} from "react";

const ServerConnectionManager = ({ currentUser, selectedCard, setUsers, setCards }) => {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    newConnection();
  }, []);

  useEffect(() => {
    if (!currentUser || !socket) return;
    sendMessage('USER_DATA', currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      sendMessage('USER_DATA', currentUser);
    }

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      switch (receivedMessage.command) {
        case 'UPDATE_CARDS':
          setCards(receivedMessage.data);
          return;
        case 'UPDATE_USERS':
          setUsers(receivedMessage.data);
          return;
        case 'SET_ID':
          currentUser.id = receivedMessage.data;
          return;
      }
    }
  }, [socket]);


  useEffect(() => {
    if (!selectedCard || selectedCard === -1) return;
    sendMessage('PICK_CARD', selectedCard);
  }, [selectedCard]);

  function newConnection() {
    const newSocket = new WebSocket('ws://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    }
  }

  function sendMessage(command: string, data: string) {
    const message = {
      command: command,
      data: data,
    }
    socket.send(JSON.stringify(message));
  }

  return (<></>);
}

export default ServerConnectionManager;
