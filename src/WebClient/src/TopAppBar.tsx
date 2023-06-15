import {useState} from "react";
import {FormGroup, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import { CirclePicker } from "react-color";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const TopAppBar = ({ setColor, setUsername }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Story Point Democracy
                    </Typography>
                    <IconButton onClick={openMenu}>
                        <AccountCircleIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
            >
                <FormGroup>
                    <MenuItem key="username">
                        <TextField label="Username" variant="outlined" onKeyDown={setUsername} />
                    </MenuItem>
                    <MenuItem key="colorPicker">
                        <CirclePicker onChangeComplete={setColor} />
                    </MenuItem>
                </FormGroup>
            </Menu>
        </Box>
    );
}
export default TopAppBar;
