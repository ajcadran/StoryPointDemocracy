import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

const CardDisplay = ({ cards }) => {

    const CardMap = () => {
        return cards.map((card) => (
            <Grid item key={card.id}>
                <Card sx={{ padding: '50px' }}>
                    <Typography sx={{ width: 'max-content', height: 'max-content', margin: 'auto', textAlign: 'center' }}>{card.value}</Typography>
                </Card>
            </Grid>
        ));
    }

    return (
        <Grid container spacing={2}>
            <CardMap/>
        </Grid>
    );
}

export default CardDisplay;


/**
<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <CardMap/>
        </Box>
*/