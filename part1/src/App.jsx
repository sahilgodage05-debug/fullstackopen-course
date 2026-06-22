// Hello component ab 'props' naam ka object accept kar raha hai
const Hello = (props) => {
  console.log(props) // Console khol kar check karna ye kya print karta hai!
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      {/* Hardcoded string aur calculation bhej rahe hain */}
      <Hello name='Maya' age={26 + 10} />
      {/* JavaScript variables bhej rahe hain (curly braces ke andar) */}
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
