import React from 'react'
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

function LocalInfo({today: { city, country, date, population}}) {
    return (
        <CardMedia style={{ textAlign: 'center', marginTop: '7%', marginBottom: '7%'}}>
            <Typography variant="h3" >
                {city}, {country}
            </Typography>
            <Typography variant="h5" >
                {date}
            </Typography>
            <Typography variant="h6" >
                Population: {population.toLocaleString()}
                {/* 
                 // * La méthode toLocaleString() renvoie une chaine de caractères représentant la date selon une locale.
               // * aussi elle renvoie un nombre comme lecriture de calculatrice , Billion , Million , ..
                */}
            </Typography>
        </CardMedia>
    )
}

export default LocalInfo
