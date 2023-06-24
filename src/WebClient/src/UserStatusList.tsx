import React, {useContext} from "react";
import { Avatar, Card, Divider, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import PersonIcon from '@mui/icons-material/Person';
import {AppContext} from "./App";

export enum UserStatusType {
    selecting = "Selecting",
    complete = "Complete",
    disconnected = "Disconnected",
}

const UserStatusList = () => {

    const {state, dispatch} = useContext(AppContext);
    const {cards, users, userCards} = state;

    const userChoice = (user) => {
        // TODO: Improve handling for when no cards have been selected, but END_ROUND is chosen
        if (cards !== null && userCards !== null && cards[userCards[user]] != undefined) return cards[userCards[user]].value;
        else return null;
    }

    const UserList = () => {
        if (!users) return null;

        return Object.keys(users).map((user: any) => (
            <ListItem
                key={users[user].id}
                secondaryAction={<IconButton><UserStatusIcon status={users[user].status} /></IconButton>}
            >
                <ListItemAvatar>
                    <Avatar sx={{ color: users[user].color || 'white' }}>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={users[user].username}
                    secondary={userChoice(user)}
                />
            </ListItem>
        ));
    }

    return (
        <Card sx={{ width: 'max-content', minWidth: '150px' }}>
            <List dense>
                <Typography sx={{ textAlign: 'center' }}>Users</Typography>
                <Divider/>
                <UserList/>
            </List>
        </Card>
    );
}

export default UserStatusList;

const UserStatusIcon = ({ status }) => {
    switch (status) {
        case UserStatusType.selecting:
            return <RadioButtonUncheckedIcon/>
        case UserStatusType.complete:
            return <CheckCircleIcon/>
        case UserStatusType.disconnected:
        default:
            return <NetworkCheckIcon/>
    }
}

