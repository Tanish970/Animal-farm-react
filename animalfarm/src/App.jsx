import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [animals,setAnimals]=useState([]);
  const [text,setText]=useState("")
  const search=async (q)=>{
    setText(q)
    console.log(q)
    const responce=await fetch(
      'https://potential-spoon-5v79jxpqgvxc45w7-8080.app.github.dev/'+new URLSearchParams({q})
    )
    data=await responce.json();
    setAnimals(data)
  }
  return (
    <>
      <h1>Animal Farm</h1>

      <input 
        placeholder='Search' 
        value={text} 
        onChange={(e)=>search(e.target.value)} 
      />
     <ul>
      {animals.map((animal)=>(
        <Animal id={animals.id} type={animals.type} name={animals.name} age={animals.age}/>
      ))}
  
</ul>
{animals.length==0 && 'No animals found'}
    </>
  );
}

function Animal({ id, type, name, age }) {
  return (
    <li key={id}> 
      <strong>{type}</strong> {name} {age}
    </li>
  );
}

export default App
