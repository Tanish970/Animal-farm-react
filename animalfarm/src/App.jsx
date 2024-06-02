import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [animals,setAnimals]=useState([]);
  const [text,setText]=useState("")
  const search=async (q)=>{
    setText(q)
    const responce=await fetch(
      'http://localhost:8080/?'+new URLSearchParams({ q })
    )
    const data=await responce.json();
    console.log(data)
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

        <Animal id={animal.id} type={animal.type} name={animal.name} age={animal.age}/>
      ))}
  
</ul>
{animals.length==0 && 'No animals found'}
    </>
  );
}

function Animal({ id, type, name, age }) {
  return (
    <li key={id}> 
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App
