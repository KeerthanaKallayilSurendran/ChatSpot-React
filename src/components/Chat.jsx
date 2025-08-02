import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { convertMsgTime } from '../lib/utill'

const Chat = ({selectUser, setSelectUSer}) => {
  const scrollEnd = useRef()
  useEffect(()=>{
      if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({behavior:"smooth"})
      }
  },[])
  return selectUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b boder-stone-500">
        <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
        <p className='flex-1 text-white text-lg  flex items-center gap-2'>Martin Johns <span className='w-2 h-2 rounded-full bg-green-500'></span></p>
        <img onClick={()=>setSelectUSer(null)}  src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-7' />
      </div>
      {/* chat */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 ">
        {
          messagesDummyData.map((msg,index)=>(
            <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
              {
                msg.image ?(
                  <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
                ):(
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8  break-all text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9'? 'rounded-br-none' : 'rounded-bl-none' }`}>{msg.text}</p>
                )
              }
              <div className='text-center text-xs'>
                <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
                <p className='text-gray-500'>{convertMsgTime(msg.createdAt)}</p>
              </div>
            </div>
          ))
        }
        <div ref={scrollEnd} />
      </div>
      {/* msg send area */}
      <div className="absolute left-0 rigt-0 bottom-0 flex items-center gap-3 p-3 w-full" >
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input type="text" placeholder='Type your message...' className='flex-1 text-sm border-none outline-none p-3 rounded-lg text-white placeholder-gray-400' />
          <input type="file" id='image' accept='image/jpeg image/png' hidden />
          <label htmlFor="image"><img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' /></label>
        </div>
        <img src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <img src={assets.logo} alt="" className='max-w-25' />
    </div>
  )
}

export default Chat
