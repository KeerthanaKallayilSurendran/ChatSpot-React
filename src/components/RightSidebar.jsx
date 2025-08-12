import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'


const RightSidebar = () => {

  const {selectedUser, message} = useContext(ChatContext)
  const {logout, onlineUser} = useContext(AuthContext)
  const [messageImages, setMessageImages] = useState([])

  // get all images from the messages
  useEffect(()=>{
    setMessageImages(
      message.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[message])

  return selectedUser &&(
    <div className={`bg-[#8185b2]/10 text-white w-full realtive overflow-y-scroll ${selectedUser?'max-md:hidden' : ""} h-full`}>
      <div className='pt-15 text-light text-xs flex flex-col font-light mx-auto items-center gap-2'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-15 aspect-[1/1] rounded-full' />
        <h1 className='flex items-center  px-10 text-xl font-medium mx-auto gap-2'>{onlineUser?.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500' />}{selectedUser.fullName}</h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>
      <hr className='border-[#fffff50] my-4' />
      <div className='px-5 text-xs'>
        <p className='text-lg'>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {
            messageImages.map((url,index)=>(
              <div key={index} onClick={()=>window.open(url)} className='cursor-pointer'> 
                <img src={url} alt="" className='h-full rounded-md'  />
              </div>
            ))
          }
        </div>
      </div>
      <button onClick={()=>logout()} className='bg-[#6BBAF8] absolute bottom-5 right-0 transform -translate-x-1/2 py-2 px-20 text-white border-none text-sm font-light rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSidebar
