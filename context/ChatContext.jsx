import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";



export const ChatContext = createContext()

export const ChatProvider = ({children})=>{

    const [message,setMessage] = useState([])
    const [users,setUsers] = useState([])
    const [selectedUser,setSelectedUser] = useState(null)
    const [unSeenMsgs, setUnSeenMsgs] = useState({}) 

    const {socket, axios} = useContext(AuthContext)


    // function to get all users in the sidebar
    const getUsers = async()=>{
        try {
           const {data} = await axios.get("api/messages/users")
           if(data.success){
            setUsers(data.users)
            setUnSeenMsgs(data.unseenMsg)

           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // to get the messages of selected users
    const getMessage = async(userId)=>{
        try {
            const {data} = await axios.get(`/api/messages/${userId}`)
            if(data.success){
                setMessage(data.messages)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // fundtion to send message to selected user
    const sendMessage = async(messageData)=>{
        console.log("chat context");
        
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessage((prevMessages)=>[...prevMessages,data.newMessage])
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to subscribe to message for selected user
    const subscribeToMessage = async()=>{
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true
                setMessage((prevMessages)=>[...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }else{
                setUnSeenMsgs((prevUnseenMessages)=>({
                    ...prevUnseenMessages, [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    // funtion to unsubscribe form messages 
    const unsubscribeFromMessage = ()=>{
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessage();
        return ()=>unsubscribeFromMessage()
    },[socket, selectedUser])
    const value = {
        message,
        users,
        selectedUser,
        unSeenMsgs,
        getUsers,
        getMessage,
        sendMessage,
        setSelectedUser,
        setUnSeenMsgs
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}