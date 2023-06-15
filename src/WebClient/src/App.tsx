import React from 'react';
import {createContext, useEffect, useReducer, useState} from 'react';
import { Grid, Button } from '@mui/material';
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

	useEffect(() => {
		console.log(state);
	}, [state]);

	const addMessage = (command, message) => {
		dispatch({
			type: 'ADD_MESSAGE',
			command: command,
			data: message,
		})
	}

	// Return ----------------------------------------------------------------------------------------------------------

	const DisplayRoom = () => {
		console.log('DisplayRoom');
		switch (state.room.roundState) {
			case 'play':
				return <CardDisplay />;
			case 'display':
				return <ResultsDisplay />;
			default :
				return null;
		}
	}

	if (state === undefined) return null;

	else return (
		<AppContext.Provider value={{state, dispatch}}>
			<TopAppBar />
			<Grid container spacing={2} sx={{ width: '75%', margin: 'auto' }}>
				<Grid item>
					<UserStatusList />
				</Grid>
				<Grid item>
					<DisplayRoom />
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={() => addMessage('END_ROUND', {})}>Show Results</Button>
					<Button variant="contained" onClick={() => addMessage('NEW_ROUND', {})}>Reset Room</Button>
				</Grid>
			</Grid>
			<ServerConnectionManager />
		</AppContext.Provider>
	);
}

export default App;
