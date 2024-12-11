import { useState,useEffect } from 'react'
import './App.css'
import Landing from './components/Landing'
import Banner from './components/Banner'
import Nav from './components/Nav';

function App() {
  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      window.location.reload(); // Reload the page on window resize
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <Landing/>
      <Banner/>
    </>
  )
}

export default App
