import React, { useState } from 'react'
import Authentication from './components/Authentication'
import Back from './components/Back'
import { Outlet } from 'react-router-dom'
import { ContextProvider, ItemContext } from './Context/ItemContext'

function App() {
  const [list, setlist] = useState([])

  const updateList = (data)=> {
    setlist(data)
  }
  
  return (
    <ContextProvider value={{list, updateList}}>
      <div>
      <Back/>
      <Outlet/>
    </div>
    </ContextProvider>
  )
}

export default App