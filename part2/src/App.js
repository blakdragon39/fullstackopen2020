import React, { useState } from 'react'

const Form = ({newName, handleNameChange, newPhone, handlePhoneChange, submitNewPhone}) => {
    return (
        <form onSubmit={submitNewPhone}>
            <div>name: <input value={newName} onChange={handleNameChange}/></div>
            <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

const Filter = ({handleFilterChange}) => {
    return (<div>filter on <input onChange={handleFilterChange}/></div>)
}

const Person = ({person}) => {
    return(
        <div>{person.name} {person.phone}</div>
    )
}

const Persons = ({persons, filter}) => {
    return (
        <div>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => <Person person={person}/>)
            }
        </div>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', phone: '123' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')
    const [ filter, setFilter ] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)
    const handlePhoneChange = (event) => setNewPhone(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const submitNewName = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already in the phonebook`)
        } else {
            setPersons(persons.concat({name: newName, phone: newPhone}))
            setNewName('')
            setNewPhone('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange}/>
            <h2>Add New</h2>
            <Form
                newName={newName}
                handleNameChange={handleNameChange}
                newPhone={newPhone}
                handlePhoneChange={handlePhoneChange}
                submitNewPhone={submitNewName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}/>
        </div>
    )
}

export default App