import { useEffect, useState } from "react"
import axios from "axios"

const DisplayWeather = ({country}) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
    
    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            console.log(response);
            setWeather(response.data)
        })
    }, [])

    console.log("weather", weather);
    return (
        <div>
            {weather.weather && weather.weather.length > 0 && (
                <div>
                    <h1>Weather in {country.capital}</h1>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default DisplayWeather