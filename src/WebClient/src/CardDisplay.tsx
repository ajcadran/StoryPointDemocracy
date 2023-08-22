import React, { useContext, useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import "./_common.scss";
import { AppContext } from "./App";

const sizes = {
	twelve: {
		xs: 12,
		sm: 6,
		md: 4,
		lg: 3,
	},
	nine: {
		xs: 12,
		sm: 6,
		md: 4,
		lg: 4,
	}
}

const CardDisplay = () => {

	// @ts-ignore
	const { state, dispatch } = useContext(AppContext);
	const { selectedCard, room } = state;

	const [cardSize, setCardSize] = useState(sizes.nine);

	useEffect(() => {
		setCardSize(getCardSize());
	}, [room.cards]);

	const getBackgroundColor = (id: number) => {
		return selectedCard === id ? 'rgb(84, 110, 122)' : 'rgb(66, 66, 66)';
	}

	const getCardSize = () => {
		const numOfCards = room.cards.reduce((count: number, card: any) => {
			if (card.show) return ++count;
			else return count;
		}, 0);
		if (numOfCards <= 9) return sizes.nine;
		else return sizes.twelve;
	}

	const CardMap = () => {
		if (!room.cards) return null;
		return room.cards.map((card) => {
			if (card.show) return (
				<Grid item key={card.id} {...cardSize} sx={{ height: '25vh' }}>
					<Card className="card" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: getBackgroundColor(card.id), textAlign: 'center' }}
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
		<Grid container spacing={2} width='200%'>
			<CardMap />
		</Grid>
	);
}

export default CardDisplay;
