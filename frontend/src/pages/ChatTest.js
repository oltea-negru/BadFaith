import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/chat";

let messages = new Array();
let chatMessage;
const defaultPlayer = "Default";
export default function Chat()
{
    const [chatMessage, setMessage] = useState("");
    const [showChat, setShowChat] = useState(false);
    return (
        <div className="absolute flex flex-col justify-start text-center z-50 h-screen right-0 w-1/3 bg-[#e0e4bc]">
            <button
                className="right-0 font-another w-32 h-10 bg-green-900 rounded-md text-black"
                onClick={() =>
                {
                    setShowChat(!showChat);
                }}
            >
                Chat
            </button>
            {showChat === false ? (
                <div className=" overflow-hidden w-2/3 h-1/2 right-0 z-1">
                    <div className="flex flex-col right-[-800px]">
                        <div className="chat" id="chatbox">
                            <ul>
                                {messages.map((m) => (
                                    <ChatMessage message={m} />
                                ))}
                            </ul>
                        </div>

                        <input
                            className="chatBar"
                            id="chatBar"
                            type="text"
                            value={chatMessage}
                            placeholder="Chat"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) =>
                            {
                                if (e.key === "Enter")
                                {
                                    e.preventDefault();
                                    UpdateChat(chatMessage);
                                    setMessage("");
                                }
                            }}
                        />

                    </div>
                </div>
            ) : null}

        </div>
    );
}

function UpdateChat(message)
{
    messages.push({ player: defaultPlayer, message: message });
}
