import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>React Counter</h1>

      <div className="card">
        <h2>Count: {count}</h2>

        <button onClick={() => setCount(count + 1)}>
          Increase
        </button>

        <button onClick={() => setCount(count - 1)}>
          Decrease
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <p className="read-the-docs">
        Click on the buttons to change count
      </p>
    </>
  )
}

export default App