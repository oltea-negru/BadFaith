import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/chat";
import '../components/Chat.css';
let messages = new Array();
let chatMessage;
const defaultPlayer = "Default";
export default function Chat() {

    const [chatMessage, setMessage] = useState('');
    return (
        <div className="wrapper">
            <div className="slide">
                <div className="chat" id="chatbox">
                    <ul>
                        {messages.map((m) =>
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
                className="chatToggle"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showChat();
                }}>Chat</button>
        </div>
    );
}

function showChat() {
    const chat = document.querySelector(".slide");
    chat.classList.toggle("toggled");
    console.log("Toggled");
}

function UpdateChat(message) {
    messages.push({ player: defaultPlayer, message: message });
}
