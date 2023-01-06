import React, { useEffect } from 'react'
import Rope from '../assets/svg/RopeComponent.svg'
import Frame from '../assets/svg/FrameComponent.svg'
import GoldFrame from '../assets/svg/GoldFrameComponent.svg'
import NameBoard from '../assets/svg/NameboardComponent.svg'
import Avatar0 from "../assets/avatars/placeholder.svg";
import Avatar1 from "../assets/avatars/avatar-1.svg";
import Avatar2 from "../assets/avatars/avatar-2.svg";
import Avatar3 from "../assets/avatars/avatar-3.svg";
import Avatar4 from "../assets/avatars/avatar-4.svg";
import Avatar5 from "../assets/avatars/avatar-5.svg";
import Avatar6 from "../assets/avatars/avatar-6.svg";
import Avatar7 from "../assets/avatars/avatar-7.svg";


export default function Voting()
{
  const [votedPlayer, setVotedPlayer] = React.useState(null);
  const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]

  function playerFrame(name, avatar)
  {
    return votedPlayer === name ?
      <div onClick={() => setVotedPlayer(null)} className='w-[20%] flex flex-col justify-center mx-4 hover:cursor-pointer animate-pulse transform duration-300 ease-in-out'>
        <div className='grid place-items-center'>
          <img src={Frame} alt='Frame' className='w-fit' />
          <img src={avatars[avatar]} alt='Avatar' className='w-[50%] rounded-full absolute' />
        </div>
        <div className='relative grid place-items-center'>
          <img src={NameBoard} alt='NameBoard' />
          <p className='absolute text-white text-lg'> {name}</p>
        </div>
      </div >
      :
      <div onClick={() => setVotedPlayer(name)} className='w-[15%] flex flex-col justify-center mx-4 hover:w-[17%] hover:cursor-pointer transform duration-300 ease-in-out'>
        <div className='grid place-items-center'>
          <img src={Frame} alt='Frame' className='w-fit' />
          <img src={avatars[avatar]} alt='Avatar' className='w-[50%] rounded-full absolute' />
        </div>
        <div className='relative grid place-items-center'>
          <img src={NameBoard} alt='NameBoard' />
          <p className='absolute text-white text-lg'> {name}</p>
        </div>
      </div >
  }

  return (
    <div className='bg-voting bg-cover h-screen flex flex-col justify-between '>
      <div className='h-3/5 text-center flex flex-row justify-evenly align-middle'>
        {dummyPlayers.map((player) => playerFrame(player.nickname, player.avatar))}
      </div>

      <div className='h-2/5 w-[110%] bg-rope bg-cover bg-bottom '></div>
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