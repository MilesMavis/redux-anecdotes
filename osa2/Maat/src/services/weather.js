import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall?"
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}`
        + `lat=${lat}`
        + `&lon=${lon}`
        + `&exclude=minutely,hourly,daily,alerts`
        + `&units=metric`
        + `&appid=${api_key}`
    )
    
    return request.then(response => response.data)
}

export default {getWeather}