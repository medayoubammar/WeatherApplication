const API_KEY = 'd94bcd435b62a031771c35633f9f310a'
const URL = "https://api.openweathermap.org/data/2.5/forecast/daily"

// export const coordinates = (location) => `${URL}weather?q=${location}&appid=${API_KEY}`

export const weatherForecast = (loc) => `${URL}?q=${loc}&units=metric&cnt=7&appid=${API_KEY}`

// * URL = WATCH DOCUMENTATION FOR URL TEMPLATE 
// * q = City name (loc in our case as value)
// * units = Units of measurement. standard, metric and imperial units are available. 
//* If you do not use the units parameter, standard units will be applied by default.
// *  cnt = 7 number of days, which will be returned in the API response (max 16 days)
// * appid = API_KEY GENERATED FROM THE WEBSITE

// ! to discover other methods and templates for this api , check the official webssite of OpenweatherMap 