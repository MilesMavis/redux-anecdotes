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
      <Content parts={course.parts}/>
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}


const Header = props => <><h1>{props.course}</h1></>


const Content = props => (
  <>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
  </>
)


const Part = props => <><p>{props.part.name} {props.part.exercises}</p></>


const Total = props => <><p>Number of exercises {props.sum}</p></>


export default App
