// Exercise 2.18 - Search input component

const Search = ({ filter, onFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={onFilterChange} />
    </div>
  )
}

export default Search
