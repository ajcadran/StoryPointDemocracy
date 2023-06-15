import { Box, Card, Grid, Typography } from "@mui/material";
import "./_common.scss";

//const styles = require("_common.scss");

const CardDisplay = ({ cards, callback }) => {
    const CardMap = ({ callback }) => {
        if (!cards) return null;
        return cards.map((card) => (
            <Grid item key={card.id}>
                <Card className="card" sx={{ paddingX: '50px', paddingY: '70px' }} onClick={() => callback(card.id)}>
                    <Typography sx={{ width: 'max-content', height: 'max-content', margin: 'auto', textAlign: 'center' }}>{card.value}</Typography>
                </Card>
            </Grid>
        ));
    }

    //if (!cards) return null;

    return (
        <Grid container spacing={2} sx={{ maxWidth: '800px' }}>
            <CardMap callback={callback}/>
        </Grid>
    );
}

export default CardDisplay;


/**
<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <CardMap/>
        </Box>
*/