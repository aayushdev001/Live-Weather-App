import React, { useState, useEffect } from 'react'
import "./SearchBox.css"

function SearchBox() {

    const [cityName, setCityName] = useState("Mumbai");
    const [weatherData, setWeatherData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [weatherState, setWeatherState] = useState("");
    // let data = [];
    async function getWeather() {
        try {
            // setIsLoading(true);
            // console.log("Search term = "+cityName);
            // let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f840f08444c59ce09a2fbb87f9bff214`;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=6a2cee17d0e67c3d78ba8ba34e094f6b`;

            console.log("getting weather...");
            let res = await fetch(url);
            let data = await res.json();
            // console.log(data);
            const { temp, humidity, pressure } = data.main;
            const { main: weatherType } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset,
            };
            console.log(myNewWeatherInfo)
            // console.log(data);
            setWeatherData(myNewWeatherInfo);
            // console.log(weatherData);
            // setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }

    }
    // console.log(weatherData);

    useEffect(() => {
        console.log("Use effect");
        getWeather();
        // getWeather();
        console.log("function called")
        // setIsLoading(false);
    }, [])
    useEffect(() => {
        if (weatherData.weatherType) {
            switch (weatherData.weatherType) {
                case "Clouds":
                    setWeatherState("wi-day-cloudy");
                    break;
                case "Haze":
                    setWeatherState("wi-fog");
                    break;
                case "Clear":
                    setWeatherState("wi-day-sunny");
                    break;
                case "Mist":
                    setWeatherState("wi-dust");
                    break;
                case "Rain":
                    setWeatherState("wi-day-rain");
                    break;
                case "Drizzle":
                    setWeatherState("wi-sprinkle");
                    break;
                default:
                    setWeatherState("wi-day-sunny");
                    break;
            }
        }
    }, [weatherData.weatherType]);


    //converting seconds to hours
    let sec = weatherData.sunset;
    let date = new Date(sec * 1000);
    let minutes = 0;
    if (date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`;
    }
    else {
        minutes = date.getMinutes();
    }
    let timestr = `${date.getHours()}:${minutes}`

    return (
        <>
            <>
                <div className="row justify-content-center">
                    <div className="col-3">
                        <div className="my-3 d-flex">
                            <input
                                type="text"
                                value={cityName} className="form-control" id="exampleFormControlInput1" placeholder="Enter City Name" onChange={(e) => setCityName(e.target.value)}>

                            </input>
                            <button onClick={getWeather} className="ms-2 btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div id="card" className="col-6 m-0 p-0 text-center">
                        <div className="m-0 p-3 weather-icon align-items-center d-flex justify-content-center">
                            <i className={`wi ${weatherState}`}></i>
                        </div>
                        <div className="m-0 weather-details-1 align-items-center d-flex justify-content-between">
                            <div className="temperature p-3">
                                {/* 21.99 */}
                                {weatherData.temp}&deg;
                            </div>
                            <div className="weather-higlight text-center p-3">
                                <h3 className="text-center">{weatherData.weatherType}</h3>
                                <h5 className="text-center">{weatherData.name}, {weatherData.country}</h5>
                            </div>
                            <div className="time d-flex align-items-center">
                                <h2 className="mh-100 my-auto">
                                    {new Date().toLocaleString()}</h2>
                            </div>
                        </div>
                        <div id="weather-details-2" className="m-0 p-3 weather-details-2">
                            <div className="d-flex justify-content-around h-50">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center mx-4">
                                        <i className="wi wi-day-haze"></i>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="">Sunset</div>
                                        <div className="">{timestr}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center mx-4">
                                        <i className="wi wi-humidity"></i>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="">Humidity</div>
                                        <div className="">{weatherData.humidity}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around h-50">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center mx-4">
                                        <i className="wi wi-thermometer"></i>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="">Pressure</div>
                                        <div className="">{weatherData.pressure}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center mx-4">
                                        <i className="wi wi-strong-wind"></i>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-block">Wind</div>
                                        <div className="d-block">{weatherData.speed}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default SearchBox



//https://api.openweathermap.org/data/2.5/weather?q=allahabad&appid=6a2cee17d0e67c3d78ba8ba34e094f6b&units=metric

//main.temp