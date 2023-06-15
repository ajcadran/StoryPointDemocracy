
## WebClient

- More complicated conversion of choice data to pie chart. data array needs to be a count of each category, and labels need to be assigned
- Send messages to server only from messageQueue
- Add local storage getter/setter to App.tsx
  - Handle when user is reconnecting. 
    - Server resets when everyone is disconnected?
    - Moderator has room reset button?
    - End goal: Ability to create/enter/leave rooms. With creator given moderator powers

#### Bugs

- When user joins after round end, user is shown cards. Client display should be based on the server room's roundState

## WebServer

- Client connects
- Socket and ID added to client Map
- Request client data (username, color)
- Set data with socket ID to userData map

-
