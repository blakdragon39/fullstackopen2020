import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)

    const submitNewName = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already in the phonebook`)
        } else {
            setPersons(persons.concat({name: newName}))
            setNewName('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={submitNewName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div>{person.name}</div>)}
        </div>
    )
}

export default App