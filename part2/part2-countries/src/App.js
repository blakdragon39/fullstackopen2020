import {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Country'

const Filter = ({query, handleQueryChange}) =>
    <div>find countries <input value={query} onChange={handleQueryChange}/></div>

const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])

    const handleQueryChange = (event) => setQuery(event.target.value)

    const handleShowCountry = (country) => setQuery(country.name)

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }, [])

    return (
        <div>
            <Filter query={query} handleQueryChange={handleQueryChange}/>
            <Countries countries={countries} query={query} handleShowCountry={handleShowCountry}/>
        </div>
    );
}

export default App
