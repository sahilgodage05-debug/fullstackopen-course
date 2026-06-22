// ============================================
// Exercise 1.5 - Final state (covers 1.3, 1.4, 1.5)
// course ek single object hai jisme name aur parts array hai
// ============================================

// Header - course ka naam dikhata hai
const Header = (props) => {
  return <h1>{props.course}</h1>
}

// Part - ek part ka naam aur exercises count dikhata hai
// props.part ek object hai: { name: '...', exercises: N }
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

// Content - parts array receive karta hai, teen Part components render karta hai
// Exercise 1.4/1.5: parts ek array hai, seedha pass hota hai
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

// Total - parts array se total exercises calculate karta hai
const Total = (props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}

// App - Exercise 1.5: course ek single object hai
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
