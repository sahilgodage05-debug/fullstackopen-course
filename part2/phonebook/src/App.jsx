// ============================================
// Exercises 2.6 - 2.17: Phonebook
//
// 2.6  - name add karna, controlled input, default prevent
// 2.7  - duplicate name check with alert()
// 2.8  - phone number field add kiya
// 2.9  - filter/search by name (case-insensitive)
// 2.10 - refactor: Filter, PersonForm, Persons, Person components
// 2.11 - axios + useEffect se initial data fetch karo json-server se
// 2.12 - naya person backend mein save karo (POST)
// 2.13 - axios calls alag service module mein (persons.js)
// 2.14 - person delete karo (DELETE) with window.confirm
// 2.15 - duplicate name → number update karo (PUT) with confirm
// 2.16 - success notification (green) few seconds ke liye dikhao
// 2.17 - error notification (red) when update fails (e.g. 404)
// ============================================

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Exercise 2.16 + 2.17: notification state
  // message: string ya null | type: 'success' ya 'error'
  const [notification, setNotification] = useState({ message: null, type: null })

  // Helper: notification dikhao aur 5 seconds baad clear karo
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  // Exercise 2.11 + 2.13: server se initial data fetch karo
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  // Exercise 2.12 + 2.15 + 2.16 + 2.17: form submit handler
  const addPerson = (event) => {
    event.preventDefault()

    // Exercise 2.15: kya naam already exist karta hai?
    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      // Exercise 2.15: number replace karne ka confirm
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            // Exercise 2.16: success notification
            showNotification(`Updated ${returnedPerson.name}'s number`)
          })
          .catch(() => {
            // Exercise 2.17: agar person pehle se delete ho chuka ho (404)
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            )
            // State se bhi hata do - ab exist nahi karta
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    // Exercise 2.12: naya person POST karo
    const personObject = { name: newName, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        // Exercise 2.16: success notification
        showNotification(`Added ${returnedPerson.name}`)
      })
  }

  // Exercise 2.14: delete handler with confirm
  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`)

    if (confirmed) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`, 'success')
        })
        .catch(() => {
          // Exercise 2.17: agar pehle se kisi ne delete kar diya
          showNotification(
            `${name} was already removed from server`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // Exercise 2.9: case-insensitive filter
  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Exercise 2.16 + 2.17: Notification component */}
      <Notification message={notification.message} type={notification.type} />

      <Filter filter={filter} onFilterChange={e => setFilter(e.target.value)} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={e => setNewName(e.target.value)}
        onNumberChange={e => setNewNumber(e.target.value)}
        onSubmit={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
