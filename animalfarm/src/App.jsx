import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const {search,animal}=useAnimalSearch()
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

function useAnimalSearch(){
  const [animals,setAnimals]=useState([]);
  const [text,setText]=useState("")
  useEffect(()=>{
    const lastquery=localStorage.getItem('lastquery');
    search(lastquery)

  },[])
  const search=async (q)=>{
    setText(q)
    const responce=await fetch(
      'http://localhost:8080/?'+new URLSearchParams({ q })
    )
    const data=await responce.json();
    setAnimals(data)
    localStorage.setItem('lastquery')=q

  }
  return {search,animals}
}


export default App
