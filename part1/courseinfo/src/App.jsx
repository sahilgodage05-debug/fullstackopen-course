// ============================================
// Exercise 1.1 - Header, Content, Total components
// Exercise 1.2 - Content uses Part components
// ============================================

// Exercise 1.1: Header component - course ka naam dikhata hai
const Header = (props) => {
  return <h1>{props.course}</h1>
}

// Exercise 1.2: Part component - ek part ka naam aur exercises dikhata hai
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

// Exercise 1.2: Content component - teen Part components use karta hai
const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} exercises={props.exercises1} />
      <Part name={props.part2} exercises={props.exercises2} />
      <Part name={props.part3} exercises={props.exercises3} />
    </div>
  )
}

// Exercise 1.1: Total component - total exercises dikhata hai
const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

// Main App component - saara data yahan hai, props ke zariye pass karta hai
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
