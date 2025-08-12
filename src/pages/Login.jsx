import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import {AuthContext} from '../../context/AuthContext.jsx'

const Login = () => {
  const [currentState,setCurrentState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler= async(event)=>{
    event.preventDefault()
    if(currentState == "Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true)
      return
    }
    await login(currentState === "Sign Up"? 'signup': 'login', {fullName, email, password, bio})
  }
  return (
    <div>
      <div className='min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white p-6 border-gray-600 shadow-lg flex flex-col rounded-lg gap-6'>
          <h1 className='font-medium text-2xl flex justify-between items-center'>
            {currentState}
            {
              isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='cursor-pointer w-5' />
            }
          </h1>
          {
            currentState === "Sign Up" && !isDataSubmitted && (
              <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text"  className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
            )
          }
          {
            !isDataSubmitted && (
              <>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indo-500' placeholder='Email' required />
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password"  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indo-500' placeholder='Password' required />
              </>
            )
          }
          {
            currentState === "Sign Up" && isDataSubmitted && (
              <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indo-500' placeholder='Bio' required></textarea>
            )
          }
          <button type='submit' className='py-3 bg-[#6BBAF8] text-white rounded-md cursor-pointer'>{currentState === "Sign Up" ? "Sign Up" : "Login"}</button>
          <div className="flex items-center gap-2 text-sm text-indigo-500">
            <input type="checkbox" />
            <p>Agree to the terms and Privacy Policy</p>
          </div>
          <div className="flex flex-col gap-2">
            {
              currentState === "Sign Up"?
              (
                <p className='text-sm text-gray-500'>Already have an account? <span className='text-sm text-[#6bbaf8] cursor-pointer' onClick={()=>{setCurrentState("Login");setIsDataSubmitted(false)}}>Login here</span></p>
              ):
              (
                <p className='text-sm text-gray-500'>Create Account <span className='text-sm text-[#6bbaf8] cursor-pointer' onClick={()=>setCurrentState("Sign Up")}>Click Here...</span></p>
              )
            }
          </div>
        </form>
        {/* right */}
        <div>
          <img src={assets.logo} alt="" className='w-25' />
        </div>
      </div>
    </div>
  )
}

export default Login
