import React, { useContext } from "react";
import { Avatar, Card, Divider, Icon, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import PersonIcon from '@mui/icons-material/Person';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
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

	const UserChoice = ({ user }) => {
		if (room.cards !== null && userCards !== null && room.cards[userCards[user]] != undefined) return room.cards[userCards[user]].value;
		else return <DoNotDisturbIcon />;
	}

	const UserStatusIcon = ({ user }) => {
		if (user.status === UserStatusType.disconnected) return <NetworkCheckIcon sx={{ opacity: '0.3' }} />;
		else if (room.roundState != 'reveal')
			switch (user.status) {
				case UserStatusType.selecting:
					return <RadioButtonUncheckedIcon />
				case UserStatusType.complete:
					return <CheckCircleIcon />
				default:
					return <NetworkCheckIcon sx={{ opacity: '0.3' }} />
			}
		else return <IconButton><Typography><UserChoice user={user}></UserChoice></Typography></IconButton>;
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
				<ListItemText primary={users[user].username} sx={{ mr: '30px' }} />
				<UserStatusIcon user={users[user]} />
			</ListItem>
		));
	}

	return (
		<Card sx={{ minWidth: 'max-content', maxWidth: '25%', backgroundColor: '#333' }}>
			<List dense sx={{ pt: 0 }}>
				<ListItem key="users-tag" sx={{ backgroundColor: '#333' }}>
					<Typography sx={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Users</Typography>
				</ListItem>
				<Divider light />
				<UserList />
			</List>
		</Card>
	);
}

export default UserStatusList;

