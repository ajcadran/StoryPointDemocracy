import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Checkbox, Grid, Modal, Typography } from '@mui/material';
import { AppContext } from "./App";
import { CardModel } from "./Models";

const CardModal = ({modalOpen, closeModal}) => {

	// @ts-ignore
	const {state, dispatch} = useContext(AppContext);
	const {room} = state;

	const [currentCards, setCurrentCards] = useState({} as CardModel[]);

	useEffect(() => {
		setCurrentCards(room.cards as CardModel[]);
	}, [room.cards]);

    const RenderCheckboxes = () => {
		const selected = (id: number) => {
			const i = currentCards.findIndex(card => card.id === id);
			var temp = [...currentCards];
			temp[i].show = !currentCards[i].show;
			setCurrentCards(temp);
		}
        
        return (
            <Grid container sx={{ margin: 'auto' }}>
                {currentCards.map(card => (
                    <Grid item key={card.id}><Checkbox checked={card.show} onClick={() => selected(card.id)} />{card.value}</Grid>
                ))}
            </Grid>
        );
    }

	const sendCards = () => {
		dispatch({
			type: 'ADD_MESSAGE',
			command: 'SEND_ROOM_CARDS',
			data: currentCards,
		});
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
                    <RenderCheckboxes/>
                    <Button variant="contained" onClick={sendCards}>SAVE DECK</Button>
				</Box>
			</Modal>
    );
}
export default CardModal;
