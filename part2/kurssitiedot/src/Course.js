const Header = ({text}) => {
    return (
      <h2>{text}</h2>
    )
  }
  
const Content = ({ parts }) => {
  console.log("Content parts:", parts);
  return (
    <ul>
      {parts.map(part => <Part key={part.id} props={part} />)}
    </ul>
  )
}

const Part = (part) => {
  part = part.props
  console.log("Part", part)
  return <li> {part.name} {part.exercises}</li>
}



const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      total of {total} exercises
    </p>
  )
}

const Course = ({ course }) => {
  console.log("course: ", course);
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
