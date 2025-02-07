import React, { useEffect, useRef, useState } from 'react'
import { createSocketConnection } from "../utils/socket"
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newNewMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState("");
    const [online, setOnline] = useState(false);
    const [onlineUser, setOnlineUser] = useState("");
    const location = useLocation();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { firstName: targetUserFirstName, lastName: targetUserLastName, photoUrl: targetUserProfile } = location.state || {}; // Prevents errors if state is undefined

    const user: any = useSelector((store: any) => store.user);
    // const { _id: userId, firstName } = user;
    const userId = user?._id;
    const firstName = user?.firstName;
    const chatContainerRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { userId, targetUserId, firstName, text: newNewMessage });
        setNewMessage("")
    }
    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
        setMessages(chat.data.messages);
        console.log(chat.data);
        const chatMessage = chat?.data.messages.map((msg) => {
            return { firstName: msg?.senderId?.firstName, lastName: msg?.senderId?.lastName, text: msg.text, userId: msg?.senderId?._id }
        });
        setMessages(chatMessage);
    }
    useEffect(() => {
        fetchChatMessages();
    }, [])
    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();
        //As soon as the page loaded, the socket connection is made and joinChat event is emitted
        console.log("Socket connection is opened!");
        socket.emit("joinChat", { userId, targetUserId, firstName });
        console.log("Socket", socket);
        socket.on("messageReceived", ({ userId, targetUserId, firstName, text }) => {
            setMessages((messages) => [...messages, { firstName, text, userId, targetUserId }])
        });
        socket.on("userStartTyping", ({ firstName }) => {
            setIsTyping(true);
            setTypingUser(firstName)
        });
        socket.on("userStoppedTyping", ({ firstName }) => {
            setIsTyping(false);
            setTypingUser("")
        });
        socket.on("online", ({ firstName, targetUserName }) => {
            setOnline(true);
        });
        socket.on("offline", ({ firstName, targetUserName }) => {
            setOnline(false);
        });

        return () => {
            console.log("Disconnecting Socket");
            socket.disconnect();
            console.log("Socket connection is closed!");
        }

    }, [userId, targetUserId]);
    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        const socket = createSocketConnection();

        if (socket) {
            socket.emit("typing", { userId, targetUserId, firstName });

            setTimeout(() => {
                socket.emit("stopTyping", { userId, targetUserId });
            }, 1000);
        }
    };
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    useEffect(() => {
        const socket = createSocketConnection();

        socket.on("updateUserStatus", (users) => {
            setOnlineUsers(users); // Store online users in state
        });

        return () => {
            socket.off("updateUserStatus");
        };
    }, []);
    const isTargetUserOnline = onlineUsers.includes(targetUserId);

    return (
        <div className='flex justify-center  sticky'>
            <div className=' border rounded w-full bg-gray-950 md:w-[50%]  flex flex-col justify-between  overflow-auto sticky '>
                <header className='p-5 border-b  sticky top-0 bg-gray-950  z-10 flex items-center gap-5 '>
                    <div className='rounded-full h-[50px] w-[50px]'>
                        <img alt="photo" src={targetUserProfile} className='w-full h-full object-cover rounded-full' />
                    </div>
                    <div>
                        <div>{targetUserFirstName + " " + targetUserLastName}</div>
                        <span className='text-[12px]'>{isTargetUserOnline ? "🟢 online" : "🔴 offline"}</span>
                    </div>

                </header>
                <div ref={chatContainerRef} className='p-5 chat-body h-[500px] flex flex-col overflow-auto relative'>
                    {messages.map((msg, index) => {
                        return (<div className={`chat ${msg.firstName == firstName ? ' chat-end' : ' chat-start'}`} key={index}>
                            {/* <div className="chat-header text-[10px]">
                                {msg.firstName}
                            </div> */}
                            <div className={`chat-bubble mt-1`}>
                                {msg.text}
                            </div>
                            {/* {msg.userId != userId && <div className='chat-footer'>seen</div>} */}
                        </div>)
                    })}

                    {isTyping && firstName != typingUser && (
                        <span className="text-sm text-gray-400 italic  ">typing...</span>
                    )}


                </div>

                <footer className='p-5 border-t flex items-center justify-between sticky bottom-0 bg-gray-950  z-10'>

                    <input onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }} type="text" className="w-full flex input" placeholder="Type here" value={newNewMessage} onChange={(e) => handleTyping(e)} />
                    <button type='submit' className='btn btn-secondary ms-4' onClick={() => sendMessage()}>Send</button>
                </footer>
            </div>

        </div>
    )
}

export default Chat
