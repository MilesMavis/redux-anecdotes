const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
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
