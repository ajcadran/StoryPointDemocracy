import {useEffect, useState} from 'react';
import { Grid, Button } from '@mui/material';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import CardDisplay from './CardDisplay';
import ServerConnectionManager from './ServerConnectionManager';

const App = () => {

	const [currentUser, setCurrentUser] = useState({ id: null, username: "Unnamed", color: 'white', status: null });
	const [selectedCard, setSelectedCard] = useState(-1);

	const [messageQueue, setMessageQueue] = useState([]);

	const [users, setUsers] = useState({});
	const [cards, setCards] = useState([]);

	function selectCard(id: number) {
		setSelectedCard(id);
	}

	const addMessage = (command, message) => {

	}

	const setUsername = (event) => {
		if (event.key !== 'Enter') return;

		let current = Object.assign({}, currentUser);
		current.username = event.target.value;
		setCurrentUser(current);
	}

	const setColor = (color, event) => {
		let current = Object.assign({}, currentUser);
		current.color = color.hex;
		setCurrentUser(current);
	}

	return (
		<>
			<TopAppBar setColor={setColor} setUsername={setUsername} />
			<Grid container spacing={2} sx={{ width: '75%', margin: 'auto' }}>
				<Grid item>
					<UserStatusList users={users} />
				</Grid>
				<Grid item>
					<CardDisplay cards={cards} callback={selectCard} />
				</Grid>
				<Grid item>
					<Button variant="contained">Show Results</Button>
					<Button variant="contained">Reset Room</Button>
				</Grid>
			</Grid>
			<ServerConnectionManager currentUser={currentUser} selectedCard={selectedCard} setUsers={setUsers} setCards={setCards} />
		</>
	);
}

export default App;
