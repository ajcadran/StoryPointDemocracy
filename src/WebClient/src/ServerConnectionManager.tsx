import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "./App";

function getLocalStorageUser() {
  const item = localStorage.getItem('StoryPointDemocracy');
  return item ? JSON.parse(item) : null;
}

function setLocalStorageUser(obj: Object) {
  localStorage.setItem('StoryPointDemocracy', JSON.stringify(obj));
}

const ServerConnectionManager = () => {

  // @ts-ignore
  const {state, dispatch} = useContext(AppContext);

  const [socket, setSocket] = useState();

  // On Load
  useEffect(() => {
    newConnection();
  }, []);

  // Message Queue
  useEffect(() => {
    if (state.messageQueue.length <= 0) return;
    const message = state.messageQueue.pop();
    sendMessage(message.command, message.data);
  }, [state.messageQueue]);

  // On Current User Change
  useEffect(() => {
    if (!state.currentUser || state.establishingConnection) return;
    sendMessage('USER_PROFILE', state.currentUser);
    setLocalStorageUser(state.currentUser);
  }, [state.currentUser]);

  // On Socket Change
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
    }
  }, [socket]);

  // On Selected Card Change
  useEffect(() => {
    if (state.selectedCard === null || state.selectedCard === -1) return;
    sendMessage('PICK_CARD', state.selectedCard);
  }, [state.selectedCard]);

  function newConnection() {
    const localUser = {...state.currentUser, ...getLocalStorageUser()};
    if (localUser.id)
      dispatch({
        type: 'LOAD_STORAGE',
        data: localUser,
      });
      
    const newSocket = new WebSocket('ws://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    }
  }

  function sendMessage(command: string, data: string) {
    if (socket.readyState !== WebSocket.OPEN) return;

    const message = {
      command: command,
      data: data,
    }
    socket.send(JSON.stringify(message));
  }

  return (<></>);
}

export default ServerConnectionManager;
