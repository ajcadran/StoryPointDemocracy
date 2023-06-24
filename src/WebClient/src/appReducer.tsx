
export const initialState = {
	establishingConnection: true,
	currentUser: { id: null, username: "User", color: 'white', status: 'Selecting' },
	selectedCard: null,
	messageQueue: [],
	room: {},
	users: [],
	cards: [],
	userCards: null,
}

export const appReducer = (state, action) => {
	console.log(action);
	const serverMessage = (command) => {
		switch (command) {
			case 'UPDATE_ROOM':
				return {
					...state,
					room: action.data,
				}
			case 'UPDATE_CARDS':
				return {
					...state,
					cards: action.data,
				}
			case 'UPDATE_USERS':
				return {
					...state,
					users: action.data,
				}
			case 'SET_ID':
				return {
					...state,
					currentUser: {...state.currentUser, id: action.data},
					establishingConnection: false,
				}
			case 'REVEAL':
				return {
					...state,
					userCards: action.data,
				}
			case 'NEW_ROUND':
				return {
					...state,
					userCards: {},
					selectedCard: null,
					room: {...state.room, roundState: 'play' },
				}
		}
	}

	switch (action.type) {
		case "LOAD_STORAGE": {
			return {
				...state,
				currentUser: action.data,
				establishingConnection: false,
			}
		}
		case "RECEIVED_MESSAGE": {
			return serverMessage(action.command);
		}
		case "SET_SELECTED_CARD": {
			return {
				...state,
				selectedCard: action.data,
			}
		}
		case "ADD_MESSAGE": {
			return {
				...state,
				messageQueue: [...state.messageQueue, {command: action.command, data: action.data}],
			}
		}
		case "SET_USERNAME": {
			return {
				...state,
				currentUser: {...state.currentUser, username: action.data},
			}
		}
		case "SET_COLOR": {
			return {
				...state,
				currentUser: {...state.currentUser, color: action.data},
			}
		}
		default:
			return;
	}


}
