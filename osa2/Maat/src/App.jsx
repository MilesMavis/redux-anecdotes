import { useEffect, useState } from "react"
import Searchbox from "./components/Searchbox"
import Countries from "./components/Countries"
import countryService from "./services/Countries"

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = event => setSearch(event.target.value)

  const countriesToShow = search => countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Searchbox value={search} onChange={handleSearchChange}/>
      <Countries countries={countriesToShow(search)} setSearch={setSearch}/>
    </div>
  )
}

export default App