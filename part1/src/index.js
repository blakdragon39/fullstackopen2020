import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const GiveFeedback = (props) => {
    return (
        <div>
            <Button text='Good' onClick={props.addGood} />
            <Button text='Neutral' onClick={props.addNeutral} />
            <Button text='Bad' onClick={props.addBad} />
        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const average = (good - bad) / (good + neutral + bad)
    const positive = (good / (good + neutral + bad)) * 100

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>No feedback given</div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text='good' value={good}/>
                    <Statistic text='neutral' value={neutral}/>
                    <Statistic text='bad' value={bad}/>
                    <Statistic text='all' value={good + neutral + bad}/>
                    <Statistic text='average' value={average}/>
                    <Statistic text='positive' value={positive}/>
                </tbody>
            </table>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <GiveFeedback
                addGood={addGood}
                addNeutral={addNeutral}
                addBad={addBad} />
            <br/>
            <h1>statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)