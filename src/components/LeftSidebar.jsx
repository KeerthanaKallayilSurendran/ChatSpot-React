import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const LeftSidebar = ({selectUser,setSelectUser}) => {

  const navigate = useNavigate()
  return (
    <div className={`bg-[#8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectUser?'max-md:hidden':""}`}>
      {/* Top  */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className='max-w-10' />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#6BBAF8] border border-gray-500 text-gray-800 hidden group-hover:block'>
              <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className='my-2 border-t border-[#C62875]' />
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>
        <div className='bg-[#1E2939] rounded-full flex items-center gap-2 py-3 px-4'>
          <img src={assets.search_icon} alt="search" className='w-5' />
          <input type="text" className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 flex-1 bg-red-800' placeholder='Search User...' />
        </div>
      </div>

      {/* All Chats */}
      <div className="flex flex-col">
        {
          userDummyData.map((user,index)=>(
            <div
            onClick={()=>(setSelectUser(user))} 
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectUser._id === user._id && 'bg-[282142]/50'}`}>
              <img src={user.profilePic || assets.avatar_icon} alt="Profile Pic" className='w-[35px] aspect[1/1] rounded-full' />
              <div className="flex flex-col leading-5">
                <p>{user.fullName}</p>
                {
                  index < 3?
                  <span className='text-green-400 text-xs'>Online</span>: 
                  <span className='text-neutral-400 text-xs'>Offline</span> 
                }
              </div>
              {
                index > 2 &&
                <p className='absolute top-4 right-4 h-5 w-5  text-xs flex justify-center items-center rounded-full bg-neutral-500/50 text-[#6bbaf8]'>{index}</p>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar
