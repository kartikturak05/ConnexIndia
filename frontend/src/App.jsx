import { useState } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Landing from './components/Landing'
import Banner from './components/Banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Landing/>
      <Banner/>
    </>
  )
}

export default App
