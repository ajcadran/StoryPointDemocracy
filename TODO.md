
## WebClient

### TODO 

- First to join room is given moderator status
  - Any user can take or relinquish moderator at any time
  - Able to end round, reset round
  - Able to edit the available cards in the room

- Improve UI
  - Increase size of chart
  - Improve alignment
  - Sanitize username input

- End goal: Ability to create/enter/leave rooms. With creator given moderator powers

### Bugs

- Username TextField: When pressing the 'U' key not in the quick succession of another key, the cursor leaves the TextField and highlights its parent instead.
- Empty user remains in user list when client disconnects due to bug.
- For new user, editing card deck shows a new list rather than what is currently being displayed.

## WebServer

### TODO

- N/A

#### Psuedocode

- On user connection
  - UPDATE_CARDS
  - UPDATE_ROOM
- On receive message
  - receivedSelectingMessage
    - USER_DATA (Used for setting the User's ID if they had previously joined the same room)
      - Assign new ID to client OR update existing ID from client
      - broadcastUsers()
    - USER_PROFILE
      - Update user data
      - broadcastUsers()
    - PICK_CARD
      - if user has not selected a card, set selected card for user
      - broadcastUsers()
    - END_ROUND
      - Set roundState to 'displaying'
      - broadcastUserCards()
  - receivedDisplayMessage
    - USER_DATA
      - Set user data
      - broadcastUsers()
    - NEW_ROUND
      - Set roundState to 'selecting'
      - Clear userCards
      - broadcastNewRouind()
      - setAllClientStatus('Selecting')

