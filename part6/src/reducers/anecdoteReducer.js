export const addVote = id => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const addAnecdote = (content) => {
    return {
        type: 'ADD',
        data: { content }
    }
}

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case 'VOTE':
            newState = state.map(anecdote => {
                if (anecdote.id === action.data.id) {
                    return { ...anecdote, votes: anecdote.votes + 1 }
                } else {
                    return anecdote
                }
            })
            break
        case 'ADD':
            const newAnecdote = asObject(action.data.content)
            newState = state.concat(newAnecdote)
            break
    }

    return newState ? newState.sort((anec1, anec2) => anec2.votes - anec1.votes) : state
}

export default anecdoteReducer
