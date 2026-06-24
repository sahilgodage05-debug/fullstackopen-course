import useStore from '../store'

const Buttons = () => {
  const incrementGood = useStore((state) => state.incrementGood)
  const incrementNeutral = useStore((state) => state.incrementNeutral)
  const incrementBad = useStore((state) => state.incrementBad)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  )
}

export default Buttons
