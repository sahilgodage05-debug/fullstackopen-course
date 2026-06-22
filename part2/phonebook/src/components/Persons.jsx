// Exercise 2.10 - Persons list component
// Exercise 2.14 - onDelete handler pass karo har Person ko

import Person from './Person'

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Persons
