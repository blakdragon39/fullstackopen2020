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

const voteOn = async (anecdote) => {
    const body = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, body)
    return response.data
}

const anecdoteService = { getAll, addAnecdote, voteOn }
export default anecdoteService
