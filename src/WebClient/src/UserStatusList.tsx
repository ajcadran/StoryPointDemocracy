import React from 'react';
import { Avatar, Box, Card, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';

export enum UserStatusType {
    selecting = "Selecting",
    complete = "Complete",
    disconnected = "Disconnected",
}

// TODO: Instead of random icons, let user choose their own color

const UserPictures = [
    <FaceIcon/>,
    <Face2Icon/>,
    <Face3Icon/>,
    <Face4Icon/>,
    <Face5Icon/>,
    <Face6Icon/>,
];

const UserStatusList = ({ users }) => {

    React.useEffect(() => {
        //console.log(users);
    }, []);

    const UserList = () => {
        return users.map((user) => (
            <ListItem
                key={user.id}
                secondaryAction={<IconButton><UserStatusIcon status={user.status} /></IconButton>}
            >
                <ListItemAvatar>
                    <Avatar>
                        {UserPictures[user.id]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.username}
                />
            </ListItem>
        ));
    }

    return (
        <Card sx={{ width: 'max-content' }}>
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
            return <HourglassEmptyIcon/>
        case UserStatusType.complete:
            return <CheckCircleOutlineIcon/>
        case UserStatusType.disconnected:
        default:
            return <HourglassDisabledIcon/>
    }
}

