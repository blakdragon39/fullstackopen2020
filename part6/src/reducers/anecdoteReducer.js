export const initAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        data: anecdotes
    }
}

export const addVote = id => {
    return {
        type: 'VOTE_ANECDOTE',
        data: { id }
    }
}

export const addAnecdote = (content) => {
    return {
        type: 'ADD_ANECDOTE',
        data: { content }
    }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
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
            const newAnecdote = asObject(action.data.content)
            return state.concat(newAnecdote)
        default:
            return state
    }
}

export default anecdoteReducer
