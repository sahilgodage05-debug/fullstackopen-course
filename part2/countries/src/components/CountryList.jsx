// Exercise 2.19 - Country list with "show" buttons
// Har country ke sath ek button hota hai jo us country ki detail dikhata hai

const CountryList = ({ countries, onShow }) => {
  return (
    <ul className="country-list">
      {countries.map(country => (
        <li key={country.cca2} className="country-list-item">
          <span>{country.name.common}</span>
          <button onClick={() => onShow(country)}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
