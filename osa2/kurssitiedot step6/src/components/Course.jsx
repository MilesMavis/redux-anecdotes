const Course = ({course}) => (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
  
  
  const Header = ({name}) => <h1>{name}</h1>
  
  const Content = ({parts}) => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
  
  const Part = ({name, exercises}) => <p>{name} {exercises}</p>
  
  const Total = ({parts}) => <b>total of {countTotal(parts)} exercises</b>
  
  const countTotal = (parts) => parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    
  
  export default Course