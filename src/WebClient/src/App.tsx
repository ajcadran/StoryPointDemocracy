import React, {createContext, useReducer} from 'react';
import {Grid, Button} from '@mui/material';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import CardDisplay from './CardDisplay';
import ServerConnectionManager from './ServerConnectionManager';
import ResultsDisplay from "./ResultsDisplay";
import {appReducer, initialState} from "./appReducer";

export const AppContext = createContext(null);

const App = () => {

	// @ts-ignore
	const [state, dispatch] = useReducer(appReducer, initialState);

	const addMessage = (command, message) => {
		dispatch({
			type: 'ADD_MESSAGE',
			command: command,
			data: message,
		})
	}

	// Return ----------------------------------------------------------------------------------------------------------

	const DisplayRoom = () => {
		switch (state.room.roundState) {
			case 'play':
				return <CardDisplay />;
			case 'reveal':
				return <ResultsDisplay />;
			default :
				return null;
		}
	}

	if (state === undefined) return null;

	else return (
		<AppContext.Provider value={{state, dispatch}}>
			{!state.establishingConnection && [
			<TopAppBar />,
			<Grid container justifyContent="center" spacing={2} sx={{ width: '75%', margin: 'auto' }}>
				<Grid item>
					<UserStatusList />
				</Grid>
				<Grid item>
					<DisplayRoom />
				</Grid>
				<Grid container justifyContent="center">
					<Button variant="contained" onClick={() => addMessage('END_ROUND', {})}>Show Results</Button>
					<Button variant="contained" onClick={() => addMessage('NEW_ROUND', {})}>Reset Room</Button>
				</Grid>
			</Grid>
			]}
			<ServerConnectionManager />
		</AppContext.Provider>
	);
}

export default App;
