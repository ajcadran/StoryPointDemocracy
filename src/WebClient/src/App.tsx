import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import CardDisplay from './CardDisplay';
import ServerConnectionManager from './ServerConnectionManager';
import ResultsDisplay from "./ResultsDisplay";

const App = () => {

	const [currentUser, setCurrentUser] = useState({ id: null, username: "User", color: 'white', status: 'Selecting' });
	const [selectedCard, setSelectedCard] = useState(null);

	const [messageQueue, setMessageQueue] = useState([]);

	const [users, setUsers] = useState({});
	const [cards, setCards] = useState([]);
	const [userCards, setUserCards] = useState(null);

	function selectCard(id: number) {
		if (selectedCard === null) setSelectedCard(id);
	}

	const addMessage = (command, message) => {
		let queue = [...messageQueue];
		queue.push({
			command: command,
			data: message,
		});
		setMessageQueue(queue);
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
					<UserStatusList users={users} userCards={userCards} cards={cards} />
				</Grid>
				<Grid item>
					{!userCards && <CardDisplay selectedCard={selectedCard} cards={cards} callback={selectCard} />}
					{userCards && <ResultsDisplay cards={cards} userCards={userCards} />}
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={() => addMessage('END_ROUND', {})}>Show Results</Button>
					<Button variant="contained" onClick={() => addMessage('NEW_ROUND', {})}>Reset Room</Button>
				</Grid>
			</Grid>
			<ServerConnectionManager messageQueue={messageQueue} currentUser={currentUser} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setUsers={setUsers} setCards={setCards} setUserCards={setUserCards} />
		</>
	);
}

export default App;
