import {useContext, useEffect, useState} from "react";
import {AppContext} from "./App";

const ServerConnectionManager = () => {

  const {state, dispatch} = useContext(AppContext);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    newConnection();
  }, []);

  useEffect(() => {
    if (state.messageQueue.length <= 0) return;
    const message = state.messageQueue.pop();
    sendMessage(message.command, message.data);
  }, [state.messageQueue]);

  useEffect(() => {
    if (!state.currentUser || !socket) return;
    sendMessage('USER_DATA', state.currentUser);
  }, [state.currentUser]);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      sendMessage('USER_DATA', state.currentUser);
    }

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      dispatch({
        type: 'RECEIVED_MESSAGE',
        command: receivedMessage.command,
        data: receivedMessage.data,
      });
      /*
      switch (receivedMessage.command) {
        case 'UPDATE_ROOM':
          setRoom(receivedMessage.data);
          return;
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
      */
    }
  }, [socket]);


  useEffect(() => {
    if (!state.selectedCard || state.selectedCard === -1) return;
    sendMessage('PICK_CARD', state.selectedCard);
  }, [state.selectedCard]);

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
