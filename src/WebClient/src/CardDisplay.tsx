import { Card, Grid, Typography } from "@mui/material";
import "./_common.scss";

const CardDisplay = ({ selectedCard, cards, callback }) => {

    const getBackgroundColor = (id) => {
        return selectedCard === id ? 'grey' : '';
    }

    const CardMap = ({ callback }) => {
        if (!cards) return null;
        return cards.map((card) => (
            <Grid item key={card.id}>
                <Card className="card" sx={{ paddingX: '50px', paddingY: '70px', backgroundColor: getBackgroundColor(card.id) }} onClick={() => callback(card.id)}>
                    <Typography sx={{ width: 'max-content', height: 'max-content', margin: 'auto', textAlign: 'center' }}>{card.value}</Typography>
                </Card>
            </Grid>
        ));
    }

    return (
        <Grid container spacing={2} sx={{ maxWidth: '800px' }}>
            <CardMap callback={callback}/>
        </Grid>
    );
}

export default CardDisplay;
