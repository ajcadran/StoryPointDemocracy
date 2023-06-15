
## WebClient

- Send messages to server only from messageQueue
- Add local storage getter/setter to App.tsx
  - Handle when user is reconnecting. 
    - Server resets when everyone is disconnected?
    - Moderator has room reset button?
    - End goal: Ability to create/enter/leave rooms. With creator given moderator powers

## WebServer

- Client connects
- Socket and ID added to client Map
- Request client data (username, color)
- Set data with socket ID to userData map

-
