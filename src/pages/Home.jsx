import LeftSidebar from '../components/LeftSidebar'
import Chat from '../components/Chat'
import RightSidebar from '../components/RightSidebar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const Home = () => {
  const {selectedUser} = useContext(ChatContext)
  return (
    <div className='border w-full h-screen sm:px-[2%] sm:py-[2%]' >
      <div className={`border-2 rounded-2xl overflow-hidden h-[100%]  backdropu-blur-xl grid grid-cols-1 relative  ${selectedUser? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2' } `}>
        <LeftSidebar />
        <Chat />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home
