import { useState, useEffect } from 'react'
import axiosService from './services/axiosService';
import DisplayContacts from './components/DisplayContacts';
import AddContactForm from "./components/AddContactForm"
import FilterForm from "./components/FilterForm"
import { Notification, notificationHandler } from "./components/Notification"

const App = () => {
  const [persons,   setPersons]   = useState([])
  const [newName,   setNewName]   = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("")

  useEffect(() => {
    axiosService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const contactObject = {
      name: newName,
      number: newNumber
    }

    const result = persons[isInArray(persons.map(person => person.name), newName)]
    console.log("result",result);
    if (result === undefined) {
      axiosService
      .create(contactObject)
      .then(initialPersons => {
          setPersons(persons.concat(initialPersons))
          setNewName("")
          setNewNumber("")
          notificationHandler(
            "success",
            `Added ${newName}`,
            setMessageType,
            setMessage
          )
        })
      .catch(error => {
        notificationHandler(
          "error",
          `An error occured:\n${error}`,
          setMessageType,
          setMessage
        )
      })
    }
    
    else if (newNumber !== result.number) {
      if (window.confirm(`${result.name} is already added to phonebook, replace the old number with a new one?`)) {
        axiosService
        .update(result.id, contactObject)
        .then((response) => {
          console.log("update response", response)
          const updatedPersons = persons.map(person => {
            if (person.id === result.id) {
              return { ...person, number: newNumber }
            }
            return person
          })      
          setPersons(updatedPersons)
          notificationHandler(
            "success",
            `Updated ${newName}'s number to: ${newNumber}`,
            setMessageType,
            setMessage
          )
        })
        .catch(error => {
          notificationHandler(
            "error",
            `Information of ${newName} has already been removed from server`,
            setMessageType,
            setMessage
          )
        })
      }
      }
    else {
      alert()
      notificationHandler(
        "error",
        `${newName} is already added to phonebook`,
        setMessageType,
        setMessage
      )
    }
  }

  const deleteContact = (id) => {
    axiosService.deleteById(id).then(() =>
    setPersons(persons.filter(person => person.id !== id))
  )
  }

  const isInArray = (array, value) => array.findIndex(element => element.trim().toUpperCase() === value.trim().toUpperCase())

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} msgClass={`notification ${messageType}`} />
      <FilterForm text={"filter shown with "} filterValue={newFilter} filterOnChange={handleFilterChange} />

      <h1>add a new</h1>
      <AddContactForm addContactHandler={addContact} nameValue={newName} nameOnChange={handleNameChange}
        NumberValue={newNumber} numberOnChange={handleNumberChange} />

      <h2>Numbers</h2>
      <DisplayContacts persons={persons} handleDelete={deleteContact} filter={newFilter} />
    </div>
  )

}

export default App