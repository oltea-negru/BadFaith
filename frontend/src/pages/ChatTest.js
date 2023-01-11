import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { AddMessage } from "../redux/slices/chatSlice";
import ChatMessage from "../components/chat";
import '../components/Chat.css';

const defaultPlayer = "Default";

export default function Chat() {

    function showChat() {
        const chat = document.querySelector(".slide");
        chat.classList.toggle("toggled");
        console.log("Toggled");
    }
    const dispatch = useDispatch()
    const { chat } = useSelector(state => state.chat);
    const [chatMessage, setMessage] = useState('');
    function UpdateChat(message) {
        const send = {
            player: defaultPlayer,
            message: message
        }
        console.log(send)
        dispatch(AddMessage(send))
    }
    return (
        <div className="wrapper">
            <div className="slide">
                <div className="chat" id="chatbox">
                    <ul>
                        {chat.map((m) =>
                            <ChatMessage message={m} />)}
                    </ul>
                </div>
                <div className="input">
                    <input className="chatBar"
                        id="chatBar"
                        type="text"
                        value={chatMessage} placeholder="Chat"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                UpdateChat(chatMessage);
                                setMessage('');
                            }
                        }} />


                </div>
            </div>
            <button
                className="chatToggle font-another"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showChat();
                }}>Chat</button>
        </div>
    );
}


