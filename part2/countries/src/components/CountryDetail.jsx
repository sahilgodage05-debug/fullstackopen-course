// Exercise 2.18 - Single country detail view
// Exercise 2.20 - Includes Weather component for capital

import Weather from './Weather'

const CountryDetail = ({ country }) => {
  // Languages object ka array of values nikalo
  const languages = Object.values(country.languages || {})
  const capital = country.capital?.[0]

  return (
    <div className="country-detail">
      <h2>{country.name.common}</h2>

      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="country-flag"
      />

      {/* Exercise 2.20 - Weather widget */}
      {capital && <Weather capital={capital} />}
    </div>
  )
}

export default CountryDetail
