import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerWaiting from "../components/player_waiting";
import Chat from "./ChatTest";

export default function WaitingRoom()
{
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    // async function getPlayers(){
    //     var i=0;
    //     while(i<3){
    //         setPlayers(...players,dummyPlayers[i]);
    //         setTimeout(() =>
    //         {
    //            console.log("jo");
    //         }, 500);
    //         i++;
    //     }
    // }

    // useEffect(() => {   
    //     getPlayers();
    //     console.log(players.length);
    // }, []);

    return (
        <div className="grid h-screen place-items-center bg-main bg-cover">
            <div>
                <div>
                    <p
                        onClick={() => navigate("/settings")}
                        className="text-9xl text-white font-bloomberg absolute slowAnim hover:translate-x-3 hover:-translate-y-3 cursor-pointer">
                        Bad Faith</p>
                </div>
                <div className="overflow-hidden">
                    <p className="text-9xl text-blue-600 font-bloomberg overflow-hidden static">
                        Bad Faith</p>
                </div>

                {dummyPlayers.map((player) =>
                    <PlayerWaiting text={player.nickname} />)}

                <div className="w-14">
                    <PlayerWaiting text={"S"} />
                </div>
                <div className="w-32">
                    <PlayerWaiting text={"haha"} />
                </div>
                <Chat/>

            </div>
        </div>
    );
}

const dummyPlayers = [
    {
        "nickname": "aaryan",
    },
    {
        "nickname": "oltea",
    },
    {
        "nickname": "nee",
    },
    {
        "nickname": "gavin",
    },

]