import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({handleQueryChange}) => <div>find countries <input onChange={handleQueryChange}/></div>

const TooMany = () => <div>Too many matches, specify another filter</div>

const CountryName = ({country}) => <div>{country.name}</div>

const Country = ({country}) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <p>
                <b>Capital:</b> {country.capital} <br/>
                <b>Population:</b> {country.population}
            </p>
            <h3>Languages</h3>
            <ul>
                {
                    country.languages.map(language => <li key={language.name}>{language.name}</li> )
                }
            </ul>
            <img src={country.flag} height="200px"/>
        </div>
    )
}

const Countries = ({countries, query}) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))

    if (filteredCountries.length === 1) {
        return (<Country country={filteredCountries[0]} /> )
    } else if (filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map(country => <CountryName country={country} key={country.name}/>)}
            </div>
        )
    } else {
        return (<TooMany/>)
    }
}

const App = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])

    const handleQueryChange = (event) => setQuery(event.target.value)

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }, [])

    return (
        <div>
            <Filter handleQueryChange={handleQueryChange}/>
            <Countries countries={countries} query={query}/>
        </div>
    );
}

export default App
