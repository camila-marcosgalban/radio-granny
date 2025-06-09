import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RadioApp from './components/RadioApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RadioApp/>
    </>
  )
}

export default App
