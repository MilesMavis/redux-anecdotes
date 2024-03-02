import { useEffect, useState } from "react"
import Searchbox from "./components/Searchbox"
import Countries from "./components/Countries"
import countryService from "./services/countriesService"
import weatherService from "./services/weather"

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (country) {
      const lat = country.capitalInfo.latlng[0]
      const lng = country.capitalInfo.latlng[1]

      weatherService
        .getWeather(lat, lng)
          .then(newWeather => {
            setWeather(newWeather)
        })
    } else {
      setWeather([])
    }
  }, [country])

  const handleSearchChange = event => setSearch(event.target.value)

  const countriesToShow = search => {
    if (countries.length === 1) {
      setCountry(countries[0])
      setCountries([countries[0]])
    } else {
      setCountry(null)
      countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    }
  }

  return (
    <div>
      <Searchbox value={search} onChange={handleSearchChange}/>
      <Countries countries={countriesToShow(search)} setSearch={setSearch} weather={weather}/>
    </div>
  )
}

export default App