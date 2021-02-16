import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        if (anecdote) {
            anecdoteService.addAnecdote(anecdote)
                .then(newAnecdote => {
                    dispatch(addAnecdote(newAnecdote))

                    event.target.anecdote.value = ''
                    dispatch(setNotification(`Added ${anecdote}`))
                    setTimeout(() => dispatch(removeNotification()), 5000)
                })
        }
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
