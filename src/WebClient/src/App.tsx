import React, { createContext, useReducer } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import CardDisplay from './CardDisplay';
import ServerConnectionManager from './ServerConnectionManager';
import ResultsDisplay from "./ResultsDisplay";
import { appReducer, initialState } from "./appReducer";

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
			default:
				return null;
		}
	}

	const theme =
		createTheme({
			palette: {
				mode: 'dark',
			},
		});

	if (state === undefined) return null;
	//else if (state.establishingConnection) return <Typography>Hello</Typography>;

	else return (
		<AppContext.Provider value={{ state, dispatch }}>
			<ThemeProvider theme={theme}>
				<TopAppBar />
				{!state.establishingConnection &&
					<Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'start', margin: 0, width: '80%', justifyContent: 'center' }}>
						<Grid item sx={{ mt: '20px' }}>
							<UserStatusList />
						</Grid>
						<Grid item width='25%'>
							<DisplayRoom />
							<Grid container spacing={2} sx={{ margin: 0, display: 'flex', justifyContent: 'center', width: '200%' }}>
								<Grid item>
									{state.room.roundState === "play" &&
										<Button variant="contained" onClick={() => addMessage('END_ROUND', {})}>Show Results</Button>
									}
								</Grid>
								<Grid item>
									{state.room.roundState === "reveal" &&
										<Button variant="contained" onClick={() => addMessage('NEW_ROUND', {})}>Reset Room</Button>
									}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				}
			</ThemeProvider>
			<ServerConnectionManager />
		</AppContext.Provider>
	);
}

export default App;
