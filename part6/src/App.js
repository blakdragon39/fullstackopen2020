import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const addVote = id => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

const addAnecdote = (content) => {
    return {
        type: 'ADD',
        data: { content }
    }
}

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => dispatch(addVote(id))
    const newAnecdote = (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
