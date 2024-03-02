import { useEffect, useState } from "react"
import Searchbox from "./components/Searchbox"
import Countries from "./components/Countries"
import countryService from "./services/countriesService"
import weatherService from "./services/weather"

const App = () => {
  const [search, setSearch] = useState("")
  const [initialCountries, setInitialCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setInitialCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const lat = country.capitalInfo.latlng[0]
      const lgn = country.capitalInfo.latlng[1]

      weatherService
        .getWeather(lat, lgn)
        .then(newWeather => {
          setWeather(newWeather)
        })
    }
  }, [countries])

  const handleSearchChange = event => {
    const newSearch = event.target.value

    setSearch(newSearch)
    setCountries(initialCountries.filter(country => 
      country.name.common.toLowerCase().includes(newSearch.toLowerCase())))
  }

  return (
    <div>
      <Searchbox value={search} onChange={handleSearchChange}/>
      <Countries countries={countries} weather={weather} setSearch={setSearch}/>
    </div>
  )
}

export default App