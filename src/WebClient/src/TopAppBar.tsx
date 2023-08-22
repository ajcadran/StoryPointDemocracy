import React, { useContext, useState } from "react";
import { CirclePicker } from "react-color";
import { Divider, FormGroup, IconButton, Menu, MenuItem, TextField, AppBar, Box, Toolbar, Typography, scopedCssBaselineClasses } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardModal from "./CardModal";
import { AppContext } from "./App";

const TopAppBar = () => {

	// @ts-ignore
	const { state, dispatch } = useContext(AppContext);

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

	const setUsername = (event: any) => {
		event.stopPropagation();
		if (!/^[a-zA-Z0-9]+$/.test(event.key)) {
			event.preventDefault();
			return;
		}
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

	const handlePaste = (event: any) => {
		event.preventDefault();
		const pastedText = event.clipboardData.getData('text/plain');
		if (/^[a-zA-Z0-9]+$/.test(pastedText)) 
			document.execCommand('insertText', false, pastedText);
	  };

	// DEBUG
	const clearDeadUsers = () => {
		dispatch({
			type: 'ADD_MESSAGE',
			command: 'DELETE_DEAD_USERS',
			data: null,
		})
	}

	// Return --------------------------------------------------------------

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ backgroundColor: '#222' }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Story Point Democracy
					</Typography>
					<Typography sx={{ float: 'right' }}>{state.currentUser.username}</Typography>
					<IconButton onClick={openMenu}>
						<AccountCircleIcon />
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
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Configure Deck
						</Typography>
					</MenuItem>
					<MenuItem key="clear-users" onClick={clearDeadUsers}>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Clear Disconnected Users
						</Typography>
					</MenuItem>
					<Divider />
					<MenuItem key="username">
						<TextField label="Username" variant="outlined" onKeyDown={setUsername} onPaste={(e) => handlePaste(e)} inputProps={{ maxLength: 18 }} />
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
