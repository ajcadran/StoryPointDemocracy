import * as React from 'react';
import TopAppBar from './TopAppBar';
import UserStatusList from './UserStatusList';
import { Grid } from '@mui/material';
import CardDisplay from './CardDisplay';

const App = () => {

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
		<div>
			<TopAppBar/>
			<Grid container>
				<Grid item>
					<UserStatusList users={users} />
				</Grid>
				<Grid item>
					<CardDisplay cards={cards}/>
				</Grid>
			</Grid>
			
			{/** Users List **/}
			{/** Main Content **/}
		</div>
	);
}
export default App;
