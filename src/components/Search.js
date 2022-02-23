import React, { useState, useEffect } from 'react';
import { IMG_URL, API_KEY, URL } from '../globals/globals';


function Search() {

    const [search, setSearch] = useState("vancouver");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");


    useEffect(() => {
        const fetchWeather = async () => {
            const res = await fetch(`${URL}weather?q=${search}&units=metric&appid=${API_KEY}`);
            let weatherData = await res.json();
            console.log(weatherData);
            setData(weatherData);
        }
        fetchWeather();
    }, [search]);

    //Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", {month: 'long'});
    let day = d.toLocaleString("default", {weekday: 'long'});

    //Time
    let time = d.toLocaleString([], {
        hour : '2-digit',
        minute : '2-digit',
        second : '2-digit'
    });

    //Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(input);
    }

    //Weather Image
    let weatherImage = null;
    if(typeof data.main != "undefined") {
        if(data.weather[0].main == "Clouds") {
            weatherImage = "02d"
        } else if(data.weather[0].main == "Clear") {
            weatherImage = "01d"
        } else if(data.weather[0].main == "Mist" || data.weather[0].main == "Smoke" || data.weather[0].main == "Haze" || data.weather[0].main == "Dust" || data.weather[0].main == "Fog" || data.weather[0].main == "Sand" || data.weather[0].main == "Dust" || data.weather[0].main == "Ash" || data.weather[0].main == "Squall" || data.weather[0].main == "Tornado") {
            weatherImage = "50d"
        } else if(data.weather[0].main == "Snow") {
            weatherImage = "13d"
        } else if(data.weather[0].main == "Rain") {
            weatherImage = "13d"
        } else if(data.weather[0].main == "Drizzle") {
            weatherImage = "09d"
        } else if(data.weather[0].main == "Thunderstorm") {
            weatherImage = "11d"
        } 
    } else {
        return(
            <div>...Loading</div>
        )
    }
    return (
        <div className='wrapper'>
            {(typeof data.main != "undefined") ? (
                <>
                    <div className="header">
                        <h1>Weather App</h1>
                    </div>
                    <img src={`${IMG_URL}${data.weather[0].main}`} alt={`${data.weather[0].main}`} className="wrapper-img" />
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search City..."
                                className="input"
                                name="search"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                required
                            />
                        </form>
                    </div>

                    <div className="text-box">
                        <h2 className="card-title">{data.name}, {data.sys["country"]}</h2>
                        <p className="date">
                            {day}, {month} {date}, {year}
                            <br />
                            {time}
                        </p>
                        <img src={`http://openweathermap.org/img/wn/${weatherImage}@4x.png`} alt="..." />
                        <p className="weather-condition">
                            {data.weather[0].description}
                        </p>
                        <p className="temperature">
                            {Math.round(data.main.temp)}&deg;C
                        </p>
                        <p className="sub-temperature">
                            {data.main.temp_min}&deg;C | {data.main.temp_max}&deg;C
                        </p>
                        <p className="feels-like">
                            Feels Like: {data.main.feels_like}&deg;C
                        </p>
                        
                        
                    </div>
                </>
            ) : ("")}
        </div>
    )
}

export default Search;