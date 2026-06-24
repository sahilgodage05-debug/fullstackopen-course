import { useFilterActions } from '../filterStore'

const Filter = () => {
  const { setFilter } = useFilterActions()

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter-input" />
    </div>
  )
}

export default Filter
