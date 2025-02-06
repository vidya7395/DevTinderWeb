import React, { useEffect, useRef, useState } from 'react'
import { createSocketConnection } from "../utils/socket"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newNewMessage, setNewMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [typingUserName, setTypingUserName] = useState("");
    const typingTimeoutRef = useRef(null);

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
            setTypingUserName(firstName)
            setTyping(true);
        })
        socket.on("userStoppedTyping", ({ firstName }) => {
            setTyping(false);
        })


        return () => {
            console.log("Disconnecting Socket");
            socket.disconnect();
            console.log("Socket connection is closed!");
        }

    }, [userId, targetUserId]);
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
        const socket = createSocketConnection();
        if (socket) {
            socket.emit("typing", { userId, targetUserId, firstName });
        }


        // Clear the previous timeout, if any, and set a new one
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const socket = createSocketConnection();
            if (socket) {
                socket.emit("stopTyping", { userId, targetUserId, firstName });
            }
        }, 1000);
    };
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <div className='flex justify-center  sticky'>
            <div className=' border rounded w-[50%] bg-gray-950 h-[500px] flex flex-col justify-between  overflow-auto sticky '>
                <header className='p-5 border-b  sticky top-0 bg-gray-950  z-10 '>Chat</header>
                <div ref={chatContainerRef} className='p-5 chat-body h-full flex flex-col overflow-auto'>
                    {messages.map((msg, index) => {
                        return (<div className={`chat my-3 ${msg.firstName == firstName ? ' chat-end' : ' chat-start'}`} key={index}>
                            <div className="chat-header">
                                {msg.firstName}
                            </div>
                            <div className={`chat-bubble mt-1 ${msg.firstName != firstName ? ' chat-bubble-primary' : ' chat-bubble-accent'}`}>
                                {msg.text}
                            </div>

                            {/* {msg.userId != userId && <div className='chat-footer'>seen</div>} */}
                        </div>)

                    })}
                </div>

                {typing && typingUserName != firstName && <span className="text-sm text-gray-400 italic p-5 absolute bottom-[14%] ">typing...</span>}
                <footer className='p-5 border-t flex items-center justify-between sticky bottom-0 bg-gray-950  z-10'>
                    <input onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }} type="text" className="w-full flex input" placeholder="Type here" value={newNewMessage} onChange={(e) => handleTyping(e)} />
                    <button type='submit' className='btn btn-primary ms-4' onClick={() => sendMessage()}>Send</button>
                </footer>
            </div>

        </div>
    )
}

export default Chat
