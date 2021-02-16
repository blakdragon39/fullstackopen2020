import anecdoteService from '../services/anecdoteService'

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const addAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.addAnecdote(anecdote)
        dispatch({
            type: 'ADD_ANECDOTE',
            data: { anecdote: newAnecdote }
        })
    }
}

export const addVote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.voteOn(anecdote)
        dispatch({
            type: 'UPDATE_ANECDOTE',
            data: { anecdote: newAnecdote }
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'UPDATE_ANECDOTE':
            const newAnecdote = action.data.anecdote
            return state.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
        case 'ADD_ANECDOTE':
            return state.concat(action.data.anecdote)
        default:
            return state
    }
}

export default anecdoteReducer
