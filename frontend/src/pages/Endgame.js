import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { leaveRoom } from '../redux/middleware/gameServerMiddleware';

function Endgame()
{
    const {lobby, playerID} = useSelector(state => state.game) 
    const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]
    const dispatch = useDispatch()

    useEffect(() => {
        Object.entries(lobby.players).map(playerEntry => console.log(playerEntry[0], playerEntry[1]))
    }, [])

    function getNickname(target) {
        for( const [key,value] of Object.entries(lobby.players)) {
            if (key === target) return value.nickname
        }
    }
    function getVoted() {
        let highest = 0
        let keys = []
        for (const [key, value] of Object.entries(lobby.votes)) {
            if (value > highest) {
                keys = [key]
                highest = value
            } else if (value === highest) {
                keys.push(key)
            }
        }
        return keys
    }

    function getEnemies() {

        let enemies = []
        for (const [key, value] of Object.entries(lobby.players)) {
            console.log(value)
            if (value.allegiance === "Enemy" && value.role !== "Guard" && value.role !== "Blackmail" && value.role !== "Coup") enemies.push(key)
        }
        return enemies
    }
    function getAllies() {
        let enemies = []
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.allegiance === "Alliy" && value.role !== "Guard" && value.role !== "Blackmail" && value.role !== "Coup") enemies.push(key)
        }
        return enemies
    }
    function getMartyr() {
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.role === "Martyr") return key
        }
        return null
    }
    function getSplinter() {
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.allegiance === "Splinter" && value.role !== "Martyr") return key
        }
        return null
    }
    function getBlackmailed() {
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.role === "Blackmail") {
                console.log(value)
                return key
            }
        }
        return null
    }
    function getCoup() {
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.role === "Coup") {
                console.log(value)
                return key
            }
        }
        return null
    }

    function getBodyGuard() {
        for (const [key, value] of Object.entries(lobby.players)) {
            if (value.role === "Guard") return key
        }
        return null
    }

    function getWinners() {
        let winnerKeys = []
        let voted = getVoted()
        let bodyGuard = getBodyGuard()
        let blackmailed = getBlackmailed()
        let coup = getCoup()
        if (voted.length > 1 || lobby.players[voted[0]].allegiance === "Ally") {
            console.log("Enemies and Splinter win")
            console.log(getEnemies())
            console.log(getSplinter())
            getEnemies().forEach(enemy => {
                winnerKeys.push(enemy)
            })
            if (getSplinter() !== null) winnerKeys.push(getSplinter())
        } else if (lobby.players[voted[0]].role === "Martyr") {
            console.log("Martyr wins")
            winnerKeys.push(getMartyr())
        } else if (lobby.players[voted[0]].allegiance === "Enemy") {
            console.log("Allies and Splinter win")
            console.log(getAllies())
            getAllies().forEach(ally => {
                winnerKeys.push(ally)
            })
            if (getSplinter() !== null) winnerKeys.push(getSplinter())
        } else if (lobby.players[voted[0]].allegiance === "Splinter") {
            console.log("Enemies win")
            getEnemies().forEach(enemy => {
                winnerKeys.push(enemy)
            })
        }
        // check for bodyguard and blackmail win
        if (bodyGuard !== null) {
            if (voted[0] !== lobby.players[bodyGuard].target) {
                console.log("BodyGuard win")
                winnerKeys.push(bodyGuard)
            }
        }

        if (blackmailed !== null) {
            winnerKeys.forEach(winner => {
                if (winner === lobby.players[blackmailed].target) {
                    console.log("Blackmailed win")
                    winnerKeys.push(blackmailed)
                }
            })
        }
        if (coup !== null) {
            if (voted[0] == lobby.players[coup].target) {
                console.log("Coup win")
                winnerKeys.push(coup)
            }
        }
        let winners = []
        winnerKeys.forEach(winner => {
            winners.push(lobby.players[winner])
        })
        console.log(winners)
        return winners
    }

    function playerInfo(playerID, player) {
        return <div className='my-3 h-fit mx-3 text-white flex float-left flex-row justify-evenly'>
            <div className='flex flex-col mx-3  justify-between'><img src={avatars[player.avatar]} alt='avatar' className='rounded-full h-32' />
                <p className='text-3xl mt-3 bg-[#782424] rounded-md p-2 text-white'>{player.nickname}</p>
            </div>
            <div className='text-2xl flex flex-col justify-center'>
                <p>Votes: {lobby.votes[playerID]}</p>
                <p>Allegiance: {player.allegiance}</p>
                <p>Original: {player.original}</p>
                <p>Role: {player.role}</p>
                <p>Target: {getNickname(player.target)}</p>
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
                        {getWinners().map(player => {
                            return <div className='flex flex-col mx-4  justify-between'><img src={avatars[0]} alt='avatar' className='rounded-full h-20' /><p className='text-white text-2xl'>{player.nickname}</p></div>
                        })}
                    </div>

                </div>
            </div>
            <div className='text-center h-1/2 w-[90%] mx-auto p-10 flex flex-wrap justify-center'>
                {Object.entries(lobby.players).map(playerEntry => playerInfo(playerEntry[0], playerEntry[1]))}
            </div>
            <button className="absolute bottom-2 left-[48%] w-fit py-2 px-4 z-50 text-white font-another bg-[#96363094] rounded-md hover:cursor-pointer focus:outline-none active:px-16 duration-500 ease-in-out" onClick={() => {dispatch(leaveRoom(playerID))}}>Leave Game</button>
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