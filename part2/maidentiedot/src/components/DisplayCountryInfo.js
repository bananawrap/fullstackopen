import DisplayWeather from "./DisplayWeather";

const DisplayCountryInfo = ({country}) => {
    console.log("in DisplayCountryInfo country:", country);
    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />
            <DisplayWeather country={country} />
        </div>
    )
}

export default DisplayCountryInfo