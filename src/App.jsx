import { useState,useEffect } from 'react'


import './App.scss'
import Header from './Header'
import Estate from './Estate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <main className='main'>
        <Header />
        <Estate />
        </main>
    </>
  )
}

export default App
