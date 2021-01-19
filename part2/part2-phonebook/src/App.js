import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Form from './components/Form'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)
    const [ error, setError ] = useState(null)

    const handleNameChange = (event) => setNewName(event.target.value)
    const handlePhoneChange = (event) => setNewPhone(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const showNotification = (message) => {
        setError(null)
        setNotification(message)
        setTimeout(() => setNotification(null), 3000)
    }

    const showError = (error) => {
        setNotification(null)
        if (error.response) {
            if (error.response.status === 404) {
                setError(`${newName} not found in the phonebook`)
                setTimeout(() => setError(null), 3000)
            } else {
                setError(error.response.data.error)
            }
        }
    }

    const addPerson = () => {
        const newPerson = {name: newName, number: newPhone}
        phonebookService.addPerson(newPerson)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewPhone('')
                showNotification(`Added ${newPerson.name}`)
            })
            .catch(error => {
                showError(error)
            })
    }

    const updatePerson = (existingPerson) => {
        const shouldUpdatePerson = window.confirm(
            `${existingPerson.name} is already in the phonebook. Replace the old number with a new one?`)
        if (shouldUpdatePerson) {
            const newPerson = { ...existingPerson, number: newPhone }
            console.log("updating", newPerson)
            phonebookService.updatePerson(newPerson)
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id === updatedPerson.id ? newPerson : person))
                    setNewName('')
                    setNewPhone('')
                    showNotification(`Updated ${newPerson.name}`)
                })
                .catch(error => showError(error))
        }
    }

    const submitNewName = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            updatePerson(existingPerson)
        } else {
            addPerson()
        }
    }

    const deletePerson = (deletePerson) => {
        const confirmDelete = window.confirm(`Delete ${deletePerson.name}?`)
        if (confirmDelete) {
            phonebookService.deletePerson(deletePerson)
                .then(_ => setPersons(persons.filter(person => person.id !== deletePerson.id)))
                .catch(error => showError(error))
        }
    }

    useEffect(() => {
        phonebookService.getAll()
            .then(persons => setPersons(persons))
            .catch(error => showError(error))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} isError={false}/>
            <Notification message={error} isError={true}/>
            <Filter handleFilterChange={handleFilterChange}/>
            <h2>Add New</h2>
            <Form
                newName={newName}
                handleNameChange={handleNameChange}
                newPhone={newPhone}
                handlePhoneChange={handlePhoneChange}
                submitNewPhone={submitNewName}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} handleDelete={deletePerson}/>
        </div>
    )
}

export default App