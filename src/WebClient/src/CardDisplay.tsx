import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import "./_common.scss";

//const styles = require("_common.scss");

const CardDisplay = ({ cards, callback }) => {

    const CardMap = ({ callback }) => {
        return cards.map((card) => (
            <Grid item key={card.id}>
                <Card className="card" sx={{ padding: '50px' }} onClick={() => callback(card.id)}>
                    <Typography sx={{ width: 'max-content', height: 'max-content', margin: 'auto', textAlign: 'center' }}>{card.value}</Typography>
                </Card>
            </Grid>
        ));
    }

    return (
        <Grid container spacing={2}>
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