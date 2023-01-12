import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import ChatMessage from "../components/chat";
import { sendChat, gsConnect } from "../redux/middleware/gameServerMiddleware"

export default function Chat()
{
    const [chatMessage, setMessage] = useState("");
    const [showChat, setShowChat] = useState(false);
    const { chat } = useSelector(state => state.chat);

    const dispatch = useDispatch()
    // useEffect(()=> {
    //     dispatch(gsConnect())
    // }, [])
    
    function UpdateChat(message) {
        console.log('Chat submitted', message)
        dispatch(sendChat(message))
    }

    return (
        <div className="absolute flex flex-col justify-start a z-50 h-screen right-0 w-1/3 bg-transparent">
            <div className="flex flex-row justify-end m-2">
                <button
                    className="font-another text-3xl focus:outline-none hover:h-12 hover:w-36 w-32 h-10 bg-[#e3bd73] rounded-md text-white"
                    onClick={() =>
                    {
                        setShowChat(!showChat);
                    }}
                >
                    Chat
                </button>
            </div>
            {showChat === false ? (
                <div className="bg-white rounded-md overflow-hidden right-0 h-1/2 z-1 flex flex-col justify-end">
                    <div className="overflow-y-scroll scroll-smooth hover:scroll-auto flex flex-col-reverse" >
                        <ul>
                            {chat.map((m) => (
                                <ChatMessage message={m} />
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#5a2b32]">
                        <input
                            className="rounded-md m-2 p-1 font-another w-[97%]  "
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

