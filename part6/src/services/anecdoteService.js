import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async (anecdote) => {
    const body = {
        content: anecdote,
        votes: 0
    }
    const response = await axios.post(baseUrl, body)
    return response.data
}

const anecdoteService = { getAll, addAnecdote }
export default anecdoteService
