// ============================================
// Exercise 2.5 - Course component alag module mein hai
// Is file mein Course ke saare sub-components hain:
//   Header, Part, Content, Course
// ============================================

// Header - ek course ka naam dikhata hai
const Header = ({ name }) => {
  return <h2>{name}</h2>
}

// Part - ek part ka naam aur exercises count dikhata hai
// Exercise 2.1: part ek object { name, exercises, id } hai
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

// Content - parts array receive karta hai, .map() se dynamically render karta hai
// Exercise 2.1: kisi bhi number of parts ke liye kaam karta hai
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

// Course - ek poora course render karta hai
// Exercise 2.2 & 2.3: total exercises reduce() se calculate karta hai
const Course = ({ course }) => {
  // Exercise 2.3: reduce() use karke sum nikaala
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  )
}

export default Course
