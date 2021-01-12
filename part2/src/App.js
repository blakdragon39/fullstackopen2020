import React, { useState } from 'react'

const Person = ({person}) => {
    return(
        <div>{person.name} {person.phone}</div>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', phone: '123' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)
    const handlePhoneChange = (event) => setNewPhone(event.target.value)

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
            <form onSubmit={submitNewName}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <Person person={person}/>)}
        </div>
    )
}

export default App