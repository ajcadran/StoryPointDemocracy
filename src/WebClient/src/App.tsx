import React, { useState } from 'react';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import { Grid } from '@mui/material';
import CardDisplay from './CardDisplay';
import ServerConnectionManager from './ServerConnectionManager';

const App = () => {

	const [currentUser, setCurrentUser] = useState({ id: null, username: null, status: null });
	const [chosenCard, setChosenCard] = useState(-1);
	
	function selectCard(id: number) {
		console.log('Picked card:', id);
		setChosenCard(id);
	}

	const users = [
		{
			id: 0,
			username: "Apple",
			status: "Selecting",
		},
		{
			id: 1,
			username: "Green",
			status: "Disconnected",
		},
		{
			id: 2,
			username: "Pie",
			status: "Selecting",
		},
	]

	const cards = [
		{
			id: 0,
			value: 0,
		},
		{
			id: 1,
			value: 1,
		},
		{
			id: 2,
			value: 2,
		},
		{
			id: 3,
			value: 3,
		},
		{
			id: 4,
			value: 5,
		},
		{
			id: 5,
			value: 8,
		},
	]

	

	return (
		<>
			<TopAppBar/>
			<Grid container spacing={2} sx={{ width: '50%', margin: 'auto' }}>
				<Grid item>
					<UserStatusList users={users} />
				</Grid>
				<Grid item>
					<CardDisplay cards={cards} callback={selectCard}/>
				</Grid>
			</Grid>
			<ServerConnectionManager currentUser={currentUser} chosenCard={chosenCard} />
			{/** Users List **/}
			{/** Main Content **/}
		</>
	);
}

export default App;
