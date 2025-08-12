import React, { useContext, useEffect, useRef, useState } from 'react'
import { convertMsgTime } from '../lib/utill'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import assets from '../assets/assets'

const Chat = () => {
  const {selectedUser,setSelectedUser, message, sendMessage, getMessage} = useContext(ChatContext)
  const {onlineUser, authUser} = useContext(AuthContext)
  const scrollEnd = useRef()
  const [input, setInput] = useState("")

  const handleSendMessage = async(e)=>{
    e.preventDefault()
    if(input.trim() === "") return null
    await sendMessage({text:input.trim()})
    setInput("")
  }

  // handle sending an image
  const handleSendImage = async(e)=>{
    
    const file = e.target.files[0]
    if(!file || !file.type.startsWith("image/")){
      toast.error("Select an image file")
      return
    }
    const reader = new FileReader()
    reader.onloadend = async ()=>{
      await sendMessage({image:reader.result})
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(()=>{
    if(selectedUser){
      getMessage(selectedUser._id)
    }
  },[selectedUser])

  useEffect(()=>{
      if(scrollEnd.current && message){
        scrollEnd.current.scrollIntoView({behavior:"smooth"})
      }
  },[message])

  
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b boder-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-10 object-cover h-10 rounded-full' />
        <p className='flex-1 text-white text-lg  flex items-center gap-2'>{selectedUser.fullName} 
          {onlineUser.includes(selectedUser._id) && <span className='w-2 h-2 bg-green-500 rounded-full'></span>}
        </p>
        <img onClick={()=>setSelectedUser(null)}  src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-7' />
      </div>
      {/* chat */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ">
        {
          message.map((msg,index)=>(
            <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
              {
                msg.image ?(
                  <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
                ):(
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8  break-all text-white ${msg.senderId === authUser._id? 'rounded-br-none' : 'rounded-bl-none' }`}>{msg.text}</p>
                )
              }
              <div className='text-center text-xs'>
                <img src={msg.senderId === authUser._id ? authUser?.profilePic ||assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-7 h-7 rounded-full' />
                <p className='text-gray-500'>{convertMsgTime(msg.createdAt)}</p>
              </div>
            </div>
          ))
        }
        <div ref={scrollEnd} ></div>
      </div>
      {/* msg send area */}
      <div className="absolute left-0 rigt-0 bottom-0 flex items-center gap-3 p-3 w-full" >
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={(e)=>e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Type your message...' className='flex-1 text-sm border-none outline-none p-3 rounded-lg text-white placeholder-gray-400' />
          <input onChange={handleSendImage} type="file" id='image' accept='image/jpeg image/png' hidden />
          <label htmlFor="image"><img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' /></label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <img src={assets.logo} alt="" className='max-w-25' />
    </div>
  )
}

export default Chat
