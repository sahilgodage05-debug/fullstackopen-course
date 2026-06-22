import { useState } from 'react'

// ============================================================
// Exercise 1.12: Random anecdote dikhata hai
// Exercise 1.13: Vote button aur votes count
// Exercise 1.14: Sabse zyada votes wala anecdote dikhao
// ============================================================

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Exercise 1.12: selected anecdote ka index
  const [selected, setSelected] = useState(0)

  // Exercise 1.13: har anecdote ke liye votes — zero-filled array
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Exercise 1.12: random anecdote select karo
  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Exercise 1.13: current anecdote ko ek vote do
  const handleVote = () => {
    const copy = [...votes]   // array ki copy banao (state seedha mutate mat karo)
    copy[selected] += 1
    setVotes(copy)
  }

  // Exercise 1.14: sabse zyada votes wala anecdote dhundo
  const maxVotes = Math.max(...votes)
  const topAnecdote = anecdotes[votes.indexOf(maxVotes)]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{topAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App
