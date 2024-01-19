import { useState } from 'react'


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={(good - bad) / all}/>
        <StatisticLine text="positive" value={good / all}/>
      </>
    )
  }
}


const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Button = ({handleClick, name}) => <button onClick={handleClick}>{name}</button>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button name="good" handleClick={() => setGood(good + 1)}/>
        <Button name="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button name="bad" handleClick={() => setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App
