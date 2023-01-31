import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './componentes/Loader';
import WeatherCard from './componentes/WeatherCard';

const API_KEY = "f9f0af52b862408aa670831dfb6145ba"

function App() {

const [coords, setCoords] = useState();
const [weather, setWeather] = useState();
const [temps, setTemps] = useState();
const [isCelsius, setIsCelsius] = useState(true)

const success = (e) => {
  const newCoords = {
    lat: e.coords.latitude,
    lon: e.coords.longitude
  }
  setCoords(newCoords)
}

const changeUnitTemp = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
    const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    axios.get(URL)
      .then(resizeBy => { 
        
          setWeather(resizeBy.data)
          const celsius = (resizeBy.data.main.temp - 273.15).toFixed(2);
          const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
          const newTemps = {
            celsius: celsius, 
            fahrenheit: fahrenheit
          }
          setTemps(newTemps)
        
          
       
      })
      .catch(Error => console.log(Error))
    }
  }, [coords])
  

  return (
    <div className="App">
      {
        weather ? (
        <WeatherCard 
          weather={weather} 
          temps={temps} 
          isCelsius={isCelsius} 
          changeUnitTemp={changeUnitTemp}
      />
        ) : <Loader/>
      }
    </div>
  )
}

export default App
