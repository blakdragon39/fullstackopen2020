import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './componenets/AnecdoteForm'
import AnecdoteList from './componenets/AnecdoteList'

const App = () => {


    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    )
}

export default App
