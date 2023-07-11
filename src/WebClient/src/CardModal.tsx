import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Checkbox, Grid, Modal, Typography } from '@mui/material';
import { AppContext } from "./App";

const scrumCards = [
    {
		id: 0,
		value: 0,
		checked: true,
	},
	{
		id: 1,
		value: '1/2',
		checked: true,
	},
	{
		id: 2,
		value: 1,
		checked: true,
	},
	{
		id: 3,
		value: 2,
		checked: true,
	},
	{
		id: 4,
		value: 3,
		checked: true,
	},
	{
		id: 5,
		value: 5,
		checked: true,
	},
	{
		id: 6,
		value: 8,
		checked: true,
	},
	{
		id: 7,
		value: 13,
		checked: true,
	},
	{
		id: 8,
		value: 20,
		checked: true,
	},
	{
		id: 9,
		value: 40,
		checked: true,
	},
	{
		id: 10,
		value: 100,
		checked: true,
	},
	{
		id: 11,
		value: '?',
		checked: true,
	},
];

const CardModal = ({modalOpen, closeModal}) => {

	const {dispatch} = useContext(AppContext);
	
	const [currentCards, setCurrentCards] = useState(scrumCards);

    const ScrumCheckboxes = () => {

		useEffect(() => {
			setCurrentCards(scrumCards);
		}, []);

		const isChecked = (id: number) => {
			console.log('is');
			//return currentCards.some(card => card.id === id);
			return currentCards[currentCards.findIndex(card => card.id === id)].checked;
		}

		const clicked = (id: number) => {
			const i = currentCards.findIndex(card => card.id === id);
			var temp = [...currentCards];
			temp[i].checked = !currentCards[i].checked;
			setCurrentCards(temp);
		}
        
        return (
            <Grid container sx={{ margin: 'auto' }}>
                {currentCards.map(card => (
                    <Grid item><Checkbox checked={card.checked} onClick={() => clicked(card.id)} />{card.value}</Grid>
                ))}
            </Grid>
        );
    }

	const formatCards = () => {
		return currentCards.map(card => {
			if (card.checked) return { id: card.id, value: card.value }
		}).filter(card => card != null);
	}

	const sendCards = () => {
		dispatch({
			type: 'ADD_MESSAGE',
			command: 'SEND_ROOM_CARDS',
			data: formatCards(),
		})
	}

    return (
        <Modal
				open={modalOpen}
				onClose={closeModal}
				sx={{ width: '100vw', height: '100vh' }}
			>
				<Box
					sx={{ 
						margin: 'auto',
						width: 'max-content', 
						maxWidth: '20%',
						height: 'max-content',
						padding: '20px', 
						backgroundColor: '#333',
						color: 'white',
						borderRadius: '10px',
						textAlign: 'center',
					}}
				>
					<Typography variant="h4">Configure Deck</Typography>
                    <ScrumCheckboxes/>
                    <Button variant="contained" onClick={sendCards}>SAVE DECK</Button>
				</Box>
			</Modal>
    );
}
export default CardModal;
