import { useState, useEffect } from 'react'
import DisplayResults from './components/DisplayResults'
import axiosService from './services/axiosService'
import DisplayCountryInfo from './components/DisplayCountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selected, setSelected] = useState(null)


  useEffect(() => {
    console.log('fetching countries...')
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key);
    axiosService
      .getAll()
      .then(response => {
        setCountries(response)
        console.log("success", response);
      })
  }, [])

  useEffect(() => {
    if (newSearch && countries.length > 0) {
      setSearchResults(countries.filter(country => country.name.common.toUpperCase().trim().includes(newSearch.toUpperCase().trim())))
    }
  }, [newSearch])

  const handleSearch = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
    setSelected(null)
    console.log("newSearch", event.target.value);
  }


  return (
    <div>
      <form>
        find countries: <input value={newSearch} onChange={handleSearch} />
      </form>
      {
        selected ? <DisplayCountryInfo country={selected} /> :
        searchResults.length === 1 ? <DisplayCountryInfo country={searchResults[0]} /> :
        searchResults.length > 10 ? <p>too many matches, specify another filter</p> :
        <DisplayResults countries={searchResults} selectionHandler={setSelected} />
      }
    </div>
  )
}

export default App