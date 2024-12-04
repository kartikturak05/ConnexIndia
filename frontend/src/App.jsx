import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Landing from './components/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Landing/>
    </>
  )
}

export default App
