import React, { useEffect } from 'react'
import GoldFrame from '../assets/svg/GoldFrameComponent.svg'
import Avatar0 from "../assets/avatars/placeholder.svg";
import Avatar1 from "../assets/avatars/avatar-1.svg";
import Avatar2 from "../assets/avatars/avatar-2.svg";
import Avatar3 from "../assets/avatars/avatar-3.svg";
import Avatar4 from "../assets/avatars/avatar-4.svg";
import Avatar5 from "../assets/avatars/avatar-5.svg";
import Avatar6 from "../assets/avatars/avatar-6.svg";
import Avatar7 from "../assets/avatars/avatar-7.svg";

import Confetti from 'react-confetti'

function Endgame()
{

    const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]
    const [confetti, setConfetti] = React.useState(false)

    function playerInfo(name, avatar)
    {
        return <div className='my-3 h-fit mx-3 text-white flex float-left flex-row justify-evenly'>
            <div className='flex flex-col mx-3  justify-between'><img src={avatars[avatar]} alt='avatar' className='rounded-full h-32' />
                <p className='text-3xl mt-3 bg-[#782424] rounded-md p-2 text-white'>{name}</p>
            </div>
            <div className='text-2xl flex flex-col justify-center'>
                <p>Votes: 0</p>
                <p>condition?</p>
            </div>
        </div>
    }

    return (
        <div className='bg-endgame bg-cover bg-center h-screen flex flex-col justify-center font-another overflow-hidden '>
            <Confetti className='w-screen h-screen absolute' />
            <div className='h-1/2 p-2 flex justify-center min-h-[300px]'>
                <img src={GoldFrame} alt='GoldFrame' className='absolute h-1/2 max-w-[800px] min-w-[600px]' />
                <div className='flex flex-col p-10 w-2/3 max-w-[800px] min-w-[600px] z-0 justify-around text-center'>
                    <p className='text-white text-6xl'>WINNERS</p>
                    <div className='flex flex-row justify-evenly'>
                        {dummyPlayers.map((player, index) =>
                        {
                            if (index < 4) return <div className='flex flex-col mx-4  justify-between'><img src={avatars[player.avatar]} alt='avatar' className='rounded-full h-20' /><p className='text-white text-2xl'>{player.nickname}</p></div>
                        })}
                    </div>

                </div>
            </div>
            <div className='text-center h-1/2 w-[90%] mx-auto p-10 flex flex-wrap justify-center'>
                {dummyPlayers.map((player, index) => { if (index > 0) return playerInfo(player.nickname, player.avatar) })}
            </div>
            <button className="absolute bottom-2 left-[48%] w-fit py-2 px-4 text-white font-another bg-[#96363094] rounded-md hover:cursor-pointer focus:outline-none active:px-16 duration-500 ease-in-out" onClick={() => { }}>Leave Game</button>
        </div>
    )
}


const dummyPlayers = [
    {
        "nickname": "aaryan",
        "avatar": 0
    },
    {
        "nickname": "oltea",
        "avatar": 1
    },
    {
        "nickname": "nee",
        "avatar": 2
    },
    {
        "nickname": "gavin",
        "avatar": 3
    },
    {
        "nickname": "adithya",
        "avatar": 4
    },
    {
        "nickname": "thanuj",
        "avatar": 5
    },
    {
        "nickname": "cameron",
        "avatar": 6
    },

]

export default Endgame