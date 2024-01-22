import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [newFilter, setFilter] = useState("")

  const addName = (event) => {
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`) 
    } else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setName("")
      setNumber("")
    }
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      {/*
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>*/}
      <h3>Numbers</h3>
      <Persons persons={personsToShow(newFilter)}/>
    </div>
  )

}


const Filter = ({newFilter, handleFilterChange}) => (
  <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
)

const PersonForm = (props) =>
(
  <form onSubmit={props.addName}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
    <button type='submit'>add</button>
    </form>
)

const Persons = ({persons}) => <div>{persons.map(person => <Person name={person.name} number={person.number}/>)}</div>

const Person = ({name, number}) => <div>{name} {number}</div>


export default App
