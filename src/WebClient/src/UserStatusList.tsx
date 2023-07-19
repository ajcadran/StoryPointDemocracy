import React, { useContext } from "react";
import { Avatar, Card, Divider, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import PersonIcon from '@mui/icons-material/Person';
import { AppContext } from "./App";

export enum UserStatusType {
	selecting = "Selecting",
	complete = "Complete",
	disconnected = "Disconnected",
}

const UserStatusList = () => {

	// @ts-ignore
	const { state } = useContext(AppContext);
	const { room, users, userCards } = state;

	const userChoice = (user) => {
		if (room.cards !== null && userCards !== null && room.cards[userCards[user]] != undefined) return room.cards[userCards[user]].value;
		else return null;
	}

	const UserList = () => {
		if (!users) return null;

		return Object.keys(users).map((user: any) => (
			<ListItem
				key={users[user].id}
			>
				<ListItemAvatar>
					<Avatar sx={{ backgroundColor: users[user].color || 'grey', color: 'white' }}>
						<PersonIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={users[user].username}
					secondary={userChoice(user)}
				/>
				<IconButton sx={{ float: 'right' }}><UserStatusIcon status={users[user].status} /></IconButton>
			</ListItem>
		));
	}

	return (
		<Card sx={{ minWidth: 'max-content', maxWidth: '25%', backgroundColor: '#333' }}>
			<List dense sx={{ pt: 0 }}>
				<ListItem key="users-tag" sx={{ backgroundColor: '#333' }}>
					<Typography sx={{ textAlign: 'center' }}>Users</Typography>
				</ListItem>
				<Divider light />
				<UserList />
			</List>
		</Card>
	);
}

export default UserStatusList;

const UserStatusIcon = ({ status }) => {
	switch (status) {
		case UserStatusType.selecting:
			return <RadioButtonUncheckedIcon />
		case UserStatusType.complete:
			return <CheckCircleIcon />
		case UserStatusType.disconnected:
		default:
			return <NetworkCheckIcon />
	}
}

