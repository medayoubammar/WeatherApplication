import React, {useState} from 'react';
import './App.css';
import axios  from "axios";
import Search from './components/Search';
import {weatherForecast} from './Api'
import Weather from './components/Weather';
import Loader from './components/Loader';

function App() {
  //* { value : USER INPUT , current :  , weekInfo : }
  const [state, setState] = useState({
    value: '',
    current: {
    },//* current = today's weather DATA , passed for weather comp then for today comp as props,also for localInfo
    weekInfo: [], // * passed for Weather component as props then for weekly comompnent also
    loading: false, // * still search for city data
    error: false, //* City not found means error = true
  })
  
  // ! while user type on keyboard , storage the data in value. for state we gonna conserve the same state
  const handleInputChange = e => {
    setState({
      ...state,
      value: e.target.value,
    })
  };

  // ! while submitting the form and get data , loading should be true and the state will be the same as always
  const handleSearchCity = (e) => {

    e.preventDefault();
    setState({
      ...state,
      loading: true,
    })
     axios.get(weatherForecast(state.value))
    .then(response => {
      const data = response.data;
      console.log("RESPONSE DATA : ",data)
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
      ]
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 
  //  * GET TODAY's Date .
      const currentDate = new Date() // ^ standard format of date type in javascript
      console.log(currentDate)

      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`; // ^ make a new format of date DAY in letters / DAY in number / MONTH
      console.log(date)

      // * get TIME OF SUNSET AND SUNRISE of today and convert it to HH:MM format (hour,minute)
      // ? toLocaleTimeString() renvoie une chaine de caractères correspondant à l'heure dans la date, exprimée selon une localisation.
      const sunset = new Date(data.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4);
      const sunrise = new Date(data.list[0].sunrise * 1000).toLocaleTimeString().slice(0, 4);
      console.log("sunrise sunset :" , sunrise , sunset)

      // * GET today's current info , const current will include all the data of today
      const current = {
        city: data.city.name,
        country: data.city.country,
        date,
        population: data.city.population,
        desc: data.list[0].weather[0].description,
        main: data.list[0].weather[0].main,
        icon: data.list[0].weather[0].icon,
        temp: data.list[0].temp.day,
        hTemp: data.list[0].temp.max,
        lTemp: data.list[0].temp.min,
        sunrise, //* we already have this data 
        sunset, //* we already have this data 
        clouds: data.list[0].clouds,
        humidity: data.list[0].humidity,
        wind: data.list[0].speed,
        pressure: data.list[0].pressure,
      }
//* WEEK DATA
      const weekData = data.list
      const weekInfo = weekData.map((data, index) => {
        return{
          key:index, //* change id to index from 0 to 6
          main: data.weather[0].main,
          // * EN US = mois-jour-année , obtenir le jour de la semaine avec une date longue
          day: new Date(data.dt * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).slice(0,3),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          hTemp: data.temp.max,
          lTemp: data.temp.min,
        }
      })
     console.log(weekInfo)

      setState({
        ...state,
        current,
        weekInfo,
        loading: false,
        error: false,
      })
      
      })
      .catch(error => {
        console.log(error);

        setState({
          ...state,
          loading: false,
          error: true,
          current: {},
          weekInfo: [],
        })
      })
    }

  return (
    <>
      <Search 
        value={state.value}
        change={handleInputChange} //* CALLBACK
        submit={handleSearchCity} //* CALLBACK
      />
      {
        state.loading === true ? <Loader />  :
      <div>  
        {state.current.country !== undefined ? 
        <div className="weather">
          <Weather today={state.current} weekly={state.weekInfo} />
        </div> : 
        state.error ? 
        <p className="error__loc">Sorry! we don't have any information on specified location.</p> :
        <div>

        </div>
        }
      </div>
      }
    </>
  )
}

export default App;
