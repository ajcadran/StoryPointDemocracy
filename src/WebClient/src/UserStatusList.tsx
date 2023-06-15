import { Avatar, Card, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Typography } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import PersonIcon from '@mui/icons-material/Person';

export enum UserStatusType {
    selecting = "Selecting",
    complete = "Complete",
    disconnected = "Disconnected",
}

const UserStatusList = ({ users }) => {

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
            return <HourglassEmptyIcon/>
        case UserStatusType.complete:
            return <CheckCircleOutlineIcon/>
        case UserStatusType.disconnected:
        default:
            return <HourglassDisabledIcon/>
    }
}

