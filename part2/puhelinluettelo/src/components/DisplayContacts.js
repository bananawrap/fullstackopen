const DisplayContacts = (props) => {

    const results = props.persons.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase()))
  
    return (
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name} {result.number} 
          <button onClick={() => {
            if (window.confirm(`delete ${result.name} ?`)) {
              props.handleDelete(result.id)
          }}}>delete</button> 
          </li>
        ))}
      </ul>
    )
  }

export default DisplayContacts