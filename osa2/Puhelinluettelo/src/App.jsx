import { useState, useEffect } from 'react'
import personsService from "./services/persons"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notificationTimeout = ({message, type}) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deletePerson = (id, name) => {
    personsService
    .deleteEntry(id, name)
    .then(deletedPerson => {
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
      notificationTimeout({message: `Deleted ${name}`, type: "success"})
    })
  }

  const addName = (event) => {
    event.preventDefault()
    const name = newName

    if (persons.some(person => person.name === name)) {
      if (window.confirm(`${name} is already in the phonebook, 
      replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === name).id
        personsService
          .update(name, newNumber, id)
          .then(changedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : changedPerson))
            notificationTimeout({message: `Updated ${name}'s number`, type: "success"})
          })
          .catch(() => {
            notificationTimeout({message: `Information of ${name} has already been removed from the server`, type: "fail"})
            personsService
              .getAll()
              .then(persons => {
                setPersons(persons)
              })
          })
      }
    } else {

      const personObject = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notificationTimeout({message: `Added ${name}`, type: "success"})
        })
        .catch(error => {
          console.log(error.response.data)
          notificationTimeout({message: error.response.data, type: "fail"})
        })
    }
    setName("")
    setNumber("")
  }

  const personsToShow = (filter) => (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  )

  const handleFilterChange = (event) => {
    const name = event.target.value
    setFilter(name)
  }
  
  const handleNameChange = (event) => setName(event.target.value)

  const handleNumberChange = (event) => setNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationBox notification={notification}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow(newFilter)} deleteEntry={deletePerson}/>
    </div>
  )

}

const NotificationBox = ({notification}) => {
  if (notification === null) {
    return null
  } else {
    return (
      <div className={notification.type}>
        {notification.message}
      </div>
    )
  }
}

const Filter = ({newFilter, handleFilterChange}) => (
  <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addName}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
    <button type='submit'>add</button>
    </form>
)

const Persons = ({persons, deleteEntry}) => <div>{persons.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} deletePerson={deleteEntry}/>)}</div>

const Person = ({name, number, id, deletePerson}) => <div>{name} {number} <DeleteButton id={id} name={name} deletePerson={deletePerson}/></div>

const DeleteButton = ({id, name, deletePerson}) => <button onClick={() => deletePerson(id, name)}>Delete</button>


export default App
