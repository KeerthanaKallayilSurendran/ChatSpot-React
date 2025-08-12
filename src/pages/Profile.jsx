import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import {AuthContext} from '../../context/AuthContext'
const Profile = () => {
  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectImg, setSelectImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const onSaveForm = async(e)=>{
    e.preventDefault();
    if(!selectImg){
      await updateProfile({fullName:name,bio})
      navigate('/')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(selectImg)
    reader.onload = async()=>{
      const base64Img = reader.result
      await updateProfile({profilePic:base64Img, fullName:name, bio})
      navigate('/')
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex justify-between items-center w-5/6 max-w-2xl backdrop-blur-2xl border-2 border-gray-500 max-sm:flex-col-reverse rounded-lg text-white'>
        <form onSubmit={onSaveForm} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details </h3>
          <label htmlFor="avatar" className='flex item-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setSelectImg(e.target.files[0])} type="file" id="avatar" accept='image/*' hidden />
            <img src={selectImg?URL.createObjectURL(selectImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectImg && 'rounded-full'}`} />
            Upload Profile Image
          </label>           
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Your Name' required />
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indo-500' placeholder='Bio' required></textarea>
          <button type='submit' className='py-3 bg-[#6BBAF8] text-white rounded-md cursor-pointer'>Save</button>

        </form>
        <img src={authUser?.profilePic || assets.logo} className={`max-w-44 aspect-square  mx-10 max-sm:mt-10 ${authUser?.profilePic && 'rounded-full'}`} alt="" />
      </div>
    </div>
  )
}

export default Profile
