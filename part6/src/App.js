import React from 'react'
import AnecdoteForm from './componenets/AnecdoteForm'
import AnecdoteList from './componenets/AnecdoteList'
import Notification from './componenets/Notification'

const App = () => {
    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    )
}

export default App
