import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initAnecdotes, addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>
        state.anecdotes.filter(
            anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )).sort((anec1, anec2) => anec2.votes - anec1.votes)

    const dispatch = useDispatch()

    useEffect(() => dispatch(initAnecdotes()), [dispatch])

    const style = { padding: 5 }

    const vote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(`Voted for ${anecdote.content}`))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id} style={style}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
