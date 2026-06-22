// Exercise 2.9 - Search filter component
// Case-insensitive filtering by name

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter shown with:{' '}
      <input
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  )
}

export default Filter
