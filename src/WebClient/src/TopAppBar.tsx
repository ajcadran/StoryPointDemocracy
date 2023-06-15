import {useContext, useState} from "react";
import {FormGroup, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import {CirclePicker} from "react-color";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppContext} from "./App";

const TopAppBar = () => {

	const {state, dispatch} = useContext(AppContext);
	const {cards, users, userCards} = state;

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const setUsername = (event) => {
		if (event.key !== 'Enter') return;

		dispatch({
			type: 'SET_USERNAME',
			data: event.target.value,
		});

		//let current = Object.assign({}, currentUser);
		//current.username = event.target.value;
		//setCurrentUser(current);
	}

	const setColor = (color, event) => {
		dispatch({
			type: 'SET_COLOR',
			data: color.hex,
		});
		//let current = Object.assign({}, currentUser);
		//current.color = color.hex;
		//setCurrentUser(current);
	}

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
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
						<TextField label="Username" variant="outlined" onKeyDown={setUsername}/>
					</MenuItem>
					<MenuItem key="colorPicker">
						<CirclePicker onChangeComplete={setColor}/>
					</MenuItem>
				</FormGroup>
			</Menu>
		</Box>
	);
}
export default TopAppBar;
