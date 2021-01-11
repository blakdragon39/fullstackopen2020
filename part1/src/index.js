import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote, votes}) => {
    return (
        <div>
            {anecdote}<br/>
            has {votes} votes
        </div>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const generateRandom = () => setSelected(Math.floor(Math.random() * 6))

    const vote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    let highestVote = 0
    let highestIndex = 0

    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > highestVote) {
            highestVote = votes[i]
            highestIndex = i
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote
                anecdote={anecdotes[selected]}
                votes={votes[selected]} />
            <button onClick={vote}>vote</button>
            <button onClick={generateRandom}>next anecdote</button>

            <h1>Anecdote with most votes</h1>
            <Anecdote
                anecdote={anecdotes[highestIndex]}
                votes={votes[highestIndex]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)