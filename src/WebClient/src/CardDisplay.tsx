import React, { useContext } from "react";
import { Card, Grid, Typography } from "@mui/material";
import "./_common.scss";
import { AppContext } from "./App";

const CardDisplay = () => {

	// @ts-ignore
	const { state, dispatch } = useContext(AppContext);
	const { selectedCard, room } = state;

	const getBackgroundColor = (id: number) => {
		return selectedCard === id ? 'rgb(84, 110, 122)' : 'rgb(66, 66, 66)';
	}

	const CardMap = () => {
		if (!room.cards) return null;
		return room.cards.map((card) => {
			if (card.show) return (
				<Grid item key={card.id}>
					<Card className="card" sx={{ paddingX: '50px', paddingY: '70px', backgroundColor: getBackgroundColor(card.id) }}
						onClick={() => {
							if (state.selectedCard === null)
								dispatch({
									type: 'SET_SELECTED_CARD',
									data: card.id,
								})
						}}>
						<Typography variant="h3">{card.value}</Typography>
					</Card>
				</Grid>
			)
		});
	}

	return (
		<Grid container spacing={2} sx={{ maxWidth: '800px' }}>
			<CardMap />
		</Grid>
	);
}

export default CardDisplay;
