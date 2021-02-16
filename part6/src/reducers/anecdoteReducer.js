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

export const addVote = id => {
    return {
        type: 'VOTE_ANECDOTE',
        data: { id }
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

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'VOTE_ANECDOTE':
            return state.map(anecdote => {
                if (anecdote.id === action.data.id) {
                    return { ...anecdote, votes: anecdote.votes + 1 }
                } else {
                    return anecdote
                }
            })
        case 'ADD_ANECDOTE':
            return state.concat(action.data.anecdote)
        default:
            return state
    }
}

export default anecdoteReducer
