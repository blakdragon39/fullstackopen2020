const TooMany = () => <div>Too many matches, specify another filter</div>

const CountryPreview = ({country, handleShowCountry}) => {
    return (<div>{country.name}<button onClick={() => handleShowCountry(country)}>show</button></div>)
}

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>
                <b>Capital:</b> {country.capital} <br/>
                <b>Population:</b> {country.population}
            </p>
            <h3>Languages</h3>
            <ul>
                {
                    country.languages.map(language => <li key={language.name}>{language.name}</li>)
                }
            </ul>
            <img src={country.flag} height="200px" alt="flag"/>
        </div>
    )
}

const Countries = ({countries, query, handleShowCountry}) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))

    if (filteredCountries.length === 1) {
        return (<Country country={filteredCountries[0]}/>)
    } else if (filteredCountries.length <= 10) {
        return (
            <div>
                {
                    filteredCountries
                        .map(country =>
                            <CountryPreview
                                country={country}
                                key={country.name}
                                handleShowCountry={handleShowCountry}/>)
                }
            </div>
        )
    } else {
        return (<TooMany/>)
    }
}

export default Countries