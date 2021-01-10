import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  const plusOne = () => setCounter(counter + 1)
  const minusOne = () => setCounter(counter - 1)
  const toZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button
        handleClick={plusOne}
        text='plus'/>
      <Button
        handleClick={toZero}
        text='zero'/>
      <Button
        handleClick={minusOne}
        text='minus'/>
    </div>
  )
}

let counter = 1

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById('root')
)
