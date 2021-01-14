import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
    const [ persons, setPersons ] = useState([])
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
            const newPerson = {name: newName, number: newPhone}
            phonebookService.addPerson(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewPhone('')
                })

        }
    }

    useEffect(() => {
        phonebookService.getAll()
            .then(response => setPersons(response.data))
    }, [])

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