
const DisplayResults = ({countries, selectionHandler}) => {
  console.log("countries", countries);
  return (
    <ul>
      {countries.map(country => <li key={country.cca2}>{country.name.common} <button onClick={() => selectionHandler(country)}>show</button> </li>)}
    </ul>
  )
}

export default DisplayResults