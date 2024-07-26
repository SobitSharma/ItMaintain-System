import React from 'react'
import { useNavigate } from 'react-router-dom'

function Back() {
    const navigate = useNavigate()
  return (
    <div className='bg-black text-white w-full text-center text-3xl p-4'
    onClick={()=>navigate("/")}
    >
        Main Menu
    </div>
  )
}

export default Back