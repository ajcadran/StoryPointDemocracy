import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

const TopAppBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Story Point Democracy
                    </Typography>
                    <IconButton>
                        <AccountCircleIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default TopAppBar;
