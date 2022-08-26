import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import LocalInfo from './LocalInfo';
import Today from './Today';
import Weekly from './Weekly';
import './Weather.css'




function Weather({today, weekly}) {
// console.log(today,weekly)

  return (
    <div className="containerWeather">
      <Grid container>
        <Grid item xs={12} sm={6}>
        <Card className="sectionWeather" >
          <LocalInfo today={today}/>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} >
        <Card className="sectionWeather">
          <Today today={today}/>
        </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="sectionWeather">
            <Weekly weekData={ weekly } />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
export default Weather