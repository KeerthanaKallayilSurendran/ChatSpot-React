import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from "socket.io-client"

export const AuthContext = createContext()


const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

export const AuthProvider = ({children})=>{

    const [token,setToken] = useState(sessionStorage.getItem("token"))
    const [authUser, setAuthUser] = useState()    
    const [onlineUser,setOnlineUser]= useState([])
    const [socket,setSocket] = useState(null)

    // check if the user is authenticated or not and if so, set the userdata and connect to socket
    const checkAuth = async() =>{
        try {
            const {data} = await axios.get("/api/auth/check")
            if (data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // login function to handle user authentication and socket conncection
    const login = async(state, credentials)=>{
        try {
            const {data} = await axios.post(`/api/auth/${state}`, credentials)
            if(data.success){
                setAuthUser(data.userDetails)
                connectSocket(data.userDetails)
                axios.defaults.headers.common["token"] = data.token
                setToken(data.token)
                sessionStorage.setItem("token", data.token)
                toast.success(data.message)
                return true
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async()=>{
        sessionStorage.removeItem("token")
        setToken(null)
        setAuthUser(null)
        setOnlineUser([])
        delete axios.defaults.headers.common["token"]
        if(socket && socket.connected){
            socket.disconnect()
        }
        toast.success("Logged out successfully")
        
    }

    // update profile function to handle user profile updates
    const updateProfile = async(body)=>{
        try {
            const { data } = await axios.put("/api/auth/update-profile",body)
            if(data.success){
                setAuthUser(data.userDetails)
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // connect socket function to handle socket connection and online users update
    const connectSocket = async(userData)=>{
        if(!userData || socket?.connected) return
        const newSocket = io(backendUrl,{
            query:{
                userId : userData._id
            }
        })
        newSocket.connect()
        setSocket(newSocket)

        // to get online users
        newSocket.on("getOnlineUsers", (userIds)=>{
            setOnlineUser(userIds)
        })
    }

    useEffect(()=>{
        if(token){
                axios.defaults.headers.common["token"]=token
            }
            checkAuth();
    },[])
    const value  = {
        axios,
        authUser,
        onlineUser,
        socket, 
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}