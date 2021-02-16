import React from 'react'
import AnecdoteForm from './componenets/AnecdoteForm'
import AnecdoteList from './componenets/AnecdoteList'
import Notification from './componenets/Notification'
import Filter from './componenets/Filter'

const App = () => {
    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
