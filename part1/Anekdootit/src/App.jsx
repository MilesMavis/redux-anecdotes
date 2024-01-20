import { useState } from 'react'


const findMax = points => {
  let maxvotes = 0
  let anecdote = 0

  points.forEach((number, index) => {
    if (number > maxvotes) {
      maxvotes = number
      anecdote = index
    }
  });

  return (
    {votes: maxvotes, anecdote: anecdote}
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(findMax(points))
  
  const vote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMax(findMax(copy))
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max.anecdote]}</p>
      <p>has {max.votes} votes</p>
    </div>
  )
}


export default App
