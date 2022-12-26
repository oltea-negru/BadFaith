import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/chat";
let messages = new Array();
let chatMessage;
const defaultPlayer = "Default";
export default function Chat() {
    
    const [chatMessage, setMessage] = useState('');
    return (
        <div>
            <div>

                <input
                    type="text"
                    value={chatMessage} placeholder="Chat"
                    onChange={(e) => setMessage(e.target.value)} /> <button onClick={() => {
                        UpdateChat(chatMessage)
                        setMessage('');
                    }
                    }>Enter</button>

            </div>
            <ul id="chat">
                {messages.map((m) =>
                    <ChatMessage message={m} />)}
            </ul>
        </div>
    );
}

function UpdateChat(message) {
    console.log('Message Added ' + message);
    messages.push({player: defaultPlayer, message: message});
}
