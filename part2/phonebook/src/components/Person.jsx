// Exercise 2.14 - Delete button add kiya
// onDelete handler App se props ke through aata hai

const Person = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      {' '}
      <button onClick={() => onDelete(person.id, person.name)}>
        delete
      </button>
    </p>
  )
}

export default Person
