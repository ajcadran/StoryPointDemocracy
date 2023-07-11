import React, {useContext, useState} from "react";
import {CirclePicker} from "react-color";
import {Divider, FormGroup, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppContext} from "./App";
import CardModal from "./CardModal";

const TopAppBar = () => {

	const {state, dispatch} = useContext(AppContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const [modalOpen, setModalOpen] = useState(false);

	const openMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	// Modal --------------------------------------------------------------

	const openModal = () => {
		setModalOpen(true);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	// User Profile -------------------------------------------------------

	const setUsername = (event) => {
		if (event.key !== 'Enter') return;
		dispatch({
			type: 'SET_USERNAME',
			data: event.target.value,
		});
	}

	const setColor = (color) => {
		dispatch({
			type: 'SET_COLOR',
			data: color.hex,
		});
	}

	// Return --------------------------------------------------------------

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ backgroundColor: '#222' }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						Story Point Democracy
					</Typography>
					<Typography sx={{ float: 'right' }}>{state.currentUser.username}</Typography>
					<IconButton onClick={openMenu}>
						<AccountCircleIcon/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<CardModal modalOpen={modalOpen} closeModal={closeModal} />
			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={closeMenu}
			>
				<FormGroup>
					<MenuItem key="configure-deck" onClick={openModal}>
						<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
							Configure Deck
						</Typography>
					</MenuItem>
					<Divider/>
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
