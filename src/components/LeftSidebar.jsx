import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const LeftSidebar = () => {

  const {getUsers, users, selectedUser, setSelectedUser, unSeenMsgs,setUnSeenMsgs} = useContext(ChatContext)

  const {logout, onlineUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [input,setInput] = useState(false)

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;
  useEffect(()=>{
    getUsers()
  },[onlineUser])

  return (
    <div className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser?'max-md:hidden':""}`}>
      {/* Top  */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className='max-w-10' />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#6BBAF8] border border-gray-500 text-gray-800 hidden group-hover:block'>
              <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-[#C62875]' />
              <p className='cursor-pointer text-sm' onClick={()=>logout()}>Logout</p>
            </div>
          </div>
          
        </div>
        
        <div className='bg-[#1E2939] rounded-full flex items-center gap-2 py-3 px-4'>
          <img src={assets.search_icon} alt="search" className='w-5' />
          <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 flex-1 bg-red-800' placeholder='Search User...' />
        </div>
      </div>

      {/* All Chats */}
      <div className="flex flex-col">
        {
          filteredUsers.map((user,index)=>(
            <div
            onClick={()=>{setSelectedUser(user);setUnSeenMsgs(prev=>({...prev,[user._id]:0}))}} 
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[282142]/50'}`}>
              <img src={user.profilePic || assets.avatar_icon} alt="Profile Pic" className='w-10 object-cover h-10 rounded-full' />
              <div className="flex flex-col leading-5">
               
                <p>{user.fullName}</p>
                {
                  onlineUser.includes(user?._id)?
                  <span className='text-green-400 text-xs'>Online</span>: 
                  <span className='text-neutral-400 text-xs'>Offline</span> 
                }
              </div>
              {
                unSeenMsgs[user._id]>0 &&
                <p className='absolute top-4 right-4 h-5 w-5  text-xs flex justify-center items-center rounded-full bg-neutral-500/50 text-[#6bbaf8]'>{unSeenMsgs[user._id]}</p>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar
