import { useState } from 'react'

// ============================================================
// Exercise 1.10: Button component - ek feedback button
// ============================================================
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// ============================================================
// Exercise 1.10: StatisticLine - ek statistic row table mein
// Exercise 1.11: HTML table mein dikhata hai
// ============================================================
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// ============================================================
// Exercise 1.8: Statistics component - alag component
// Exercise 1.9: Sirf tab dikhao jab koi feedback ho
// Exercise 1.10: StatisticLine use karta hai
// Exercise 1.11: Table format mein
// ============================================================
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  // Exercise 1.9: agar koi feedback nahi to message dikhao
  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(1)} />
        <StatisticLine text="positive" value={positive.toFixed(1) + ' %'} />
      </tbody>
    </table>
  )
}

// ============================================================
// Exercise 1.6: good/neutral/bad state + buttons
// Exercise 1.7: total, average, positive% dikhao
// ============================================================
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
