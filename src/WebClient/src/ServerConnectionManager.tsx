import {useEffect, useState} from "react";

const ServerConnectionManager = ({ messageQueue, currentUser, selectedCard, setSelectedCard, setUsers, setCards, setUserCards }) => {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    newConnection();
  }, []);

  useEffect(() => {
    if (messageQueue.length <= 0) return;
    const message = messageQueue.pop();
    sendMessage(message.command, message.data);
  }, [messageQueue]);

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
        case 'REVEAL':
          setUserCards(receivedMessage.data);
          return;
        case 'NEW_ROUND':
          setUserCards(null);
          setSelectedCard(null);
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
