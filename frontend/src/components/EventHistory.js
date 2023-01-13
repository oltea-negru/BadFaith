import { useState } from "react";
import { useSelector } from 'react-redux'

export default function EventHistory()
{
    const [showChat, setShowChat] = useState(false);
    const { lobby } = useSelector(state => state.game);

    return (
        <div className="absolute flex flex-col justify-start a z-50 h-[50vh] bottom-0 right-0 w-1/3 bg-transparent">
            <div className="flex flex-row justify-end m-2">
                <button
                    className="font-another text-3xl focus:outline-none hover:h-12 hover:w-36 w-32 h-10 bg-[#e3bd73] rounded-md text-white"
                    onClick={() =>
                    {
                        setShowChat(!showChat);
                        console.log(showChat);
                    }}
                >
                    History
                </button>
            </div>
            {showChat ? (
                <div className="bg-[#5a2b32] rounded-md overflow-hidden right-0 h-1/2 z-1 flex flex-col justify-end">
                    <div className="overflow-y-scroll scroll-smooth hover:scroll-auto flex flex-col-reverse" >
                        <ul>
                            {lobby.eventHistory.map((m, index) => (
                                <strong className="font-another text-white text-3xl">{index+1}) {m.blind_name} : {m.player.nickname} <br /></strong>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}

        </div>
    );
}