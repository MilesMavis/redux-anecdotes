const WeatherBox = ({weather, capital}) => {
    if (weather) {
        const image = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`

        return (
            <>
                <h2>Weather in {capital}</h2>
                <div>temperature {weather.current.temp} Celcius</div>
                <div><img src={image} alt="moi" /></div>
                <div>wind {weather.current.wind_speed}</div>
            </>
        )
    }
}

export default WeatherBox