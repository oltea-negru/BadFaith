import React, { useState } from "react";
import WaitingList from "../assets/svg/EventBoardComponent.svg";
import OpenDoor from "../assets/svg/EnterEventDoorComponent.svg";
import Avatar from "../assets/avatars/avatar-1.svg";
import { useDispatch, useSelector } from 'react-redux'
import { readyUp, sendAction } from "../redux/middleware/gameServerMiddleware";

const parser = new DOMParser()
const PrivateCall = [
    "There is a private phone call for this player.",
    <br />,
    "They will be with back shortly.",
];

const Events = {
    OldAllies: {
        BlindName: "Old Allies",
        EventTitle: "Old Allies",
        BlindInfo:
            "Two players are revelead to have appeared as the same team at the start",
        Details:
            "Two players are revelead to have appeared as the same team at the start",
    },
    OldEnemies: {
        BlindName: "Old Enemies",
        EventTitle: "Old Enemies",
        BlindInfo:
            "Two players are revelead to have appeared on opposite teams at the start",
        Details:
            "Two players are revelead to have appeared on opposite teams at the start",
    },
    DeepState: {
        BlindName: "Private Call",
        EventTitle: "Deep State",
        BlindInfo: PrivateCall,
        Details: "Deep State",
    },
    SplinterCell: {
        BlindName: "Private Call",
        EventTitle: "Splinter Cell",
        BlindInfo: PrivateCall,
        Details: "Splinter Cell",
    },
    BackroomDeal: {
        BlindName: "Backroom Deal",
        EventTitle: "Backroom Deal",
        BlindInfo: [
            "Their loyalty is being put to the test.",
            <br />,
            "Is it strong enough?",
        ],
        Details: [
            "You have the option to switch teams, but if you do so you cannot vote.",
            <br />,
            "Do you accept?",
        ],
    },
    Martyr: {
        BlindName: "Private Call",
        EventTitle: "Martyr",
        BlindInfo: PrivateCall,
        Details:
            "You have been chosen as a Martyr, get yourself voted and you will be rewarded.",
    },
    BackgroundCheck: {
        BlindName: "Background Check",
        EventTitle: "Background Check",
        BlindInfo: "We have done a little digging. Here is what we know...",
    },
    PickPocket: {
        BlindName: "Pick Pocket",
        EventTitle: "Pick Pocket",
        BlindInfo: "Select a player to swap roles with",
        Details: "Select a player to swap roles with",
    },
    GagOrder: {
        BlindName: "Gag Order",
        EventTitle: "Gag Order",
        BlindInfo:
            "Someone is being a little too loud. Use this opportunity to prevent them from voting.",
        Details:
            "Someone is being a little too loud. Use this opportunity to prevent them from voting.",
    },
    BlackMark: {
        BlindName: "Black Mark",
        EventTitle: "Black Mark",
        BlindInfo: "Choose a player to add an extra vote against",
        Details: "Choose a player to add an extra vote against",
    },
    Coup: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        EventTitle: "Coup d'etat",
        Details: "Coup d'etat",
    },
    Blackmailed: {
        BlindName: "Blackmailed",
        EventTitle: "Blackmailed",
        BlindInfo: [
            "Another player has some dirt on you that cannot come to light.",
            "You will only win if they do.",
        ],
        Details: [
            "Another player has some dirt on you that cannot come to light.",
            "You will only win if they do.",
        ],
    },
    BodyGuard: {
        BlindName: "Bodyguard",
        EventTitle: "Bodyguard",
        BlindInfo: [
            "You have been employed to protect another.",
            "They cannot be voted out.",
        ],
    },
};

function OldEnemiesEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>
            <strong className="font-another text-[#ff0000]  font-bold bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.extra_players[0].nickname + " "}

                is an old enemy of
                <strong className="font-another text-[#ff0000]  font-bold bg-white object w-fit p-1 rounded-md">
                    {" " + lobby.currentEvent.extra_players[1].nickname}
                </strong> </strong>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">
                They would never knowingly work together.
            </strong>

            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >

    );
}

function OldAlliesEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    // console.log(lobby.currentEvent.extra_players);
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>
            <strong className=" text-[#ff0000] font-another font-bold bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.extra_players[0].nickname + " "}

                is an old ally of{" "}
                <strong className="font-another text-[#ff0000]">
                    {lobby.currentEvent.extra_players[1].nickname}
                </strong>
            </strong>
            <p className="font-another font-bold bg-white object w-fit p-1 rounded-md">Their last meeting was as friends.</p>


            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function DeepStateEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function deepState() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        switch (details.allegiance) {
            case "Ally":
                details.allegiance = "Enemy"
                break;
            case "Enemy":
                details.allegiance = "Ally"
                break;
        }
        eventAction(dispatch, lobbyCode, 'update', details)
    }

    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <p className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">Your mission is over</p>


            <div className=" text-[#ff0000]">
                <strong className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">SECRET</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[15%] w-[33%] right-[7%] bg-white rotate-10">
                <strong className="font-another">
                    Your Team:
                    <br />{" "}
                </strong>
                <strong className="font-another text-[#ff0000]">
                    {lobby.currentEvent.player.allegiance}
                </strong>
            </div>

            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        deepState()
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function SplinterCellEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function splinter() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        details.allegiance = "Splinter"
        console.log('SendingUpdateDetails', details)
        eventAction(dispatch, lobbyCode, 'update', details)
    }
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <p className="font-another font-bold  bg-white object w-fit p-1 rounded-md">
                You have broken away from all allegiances and now stand alone.
            </p>
            <p className="font-another font-bold  bg-white object w-fit p-1 rounded-md">You must avoid being voted out to win
            </p>
            <h2 className=" text-[#ff0000] text-center font-another font-bold  bg-white object w-fit p-1 rounded-md">
                <b>SURVIVE AT ALL COSTS</b>
            </h2>
            <div className=" text-[#ff0000] text-center font-another font-bold  bg-white object w-fit p-1 rounded-md">
                <strong className="font-another">SECRET</strong>
            </div>
            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        splinter();
                        endEvent();
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function BackroomDealEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function Betray() { // Swap
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        switch (details.allegiance) {
            case "Ally":
                details.allegiance = "Enemy"
                break;
            case "Enemy":
                details.allegiance = "Ally"
                break;
        }
        details.role = "Betray"
        eventAction(dispatch, lobbyCode, 'update', details)
    }

    function Remain() {
        endEvent(dispatch, lobbyCode);
    }

    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <div className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                <strong className="font-another">{lobby.currentEvent.details}</strong>

            </div>
            <strong className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {" "}
                Your Team:

                <strong className="font-another font-bold text-2xl bg-white text-red-500 object w-fit p-1 rounded-md">
                    {" " + lobby.currentEvent.player.allegiance}
                </strong>
            </strong>
            <div className="flex">
                <button
                    className="font-another text-2xl  mr-3 text-white bg-green-900 object w-fit p-2 rounded-md"
                    onClick={() => {
                        Remain();
                    }}
                >
                    Remain
                </button>
                <button
                    className="font-another text-2xl  text-white bg-red-900 object w-fit p-2 rounded-md"
                    onClick={() => {
                        Betray();
                    }}
                >
                    Betray
                </button>
            </div>
        </div >

    );
}

function MartyrEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function martyr() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        });
        details.allegiance = "Splinter"
        details.role = "Martyr"
        eventAction(dispatch, lobbyCode, 'update', details)
    }
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>
            <div className="font-another font-bold bg-white object w-fit p-1 rounded-md">

                If you win,{" "}
                <strong className="font-another font-bold text-[#ff0000] object w-fit p-1 rounded-md">only</strong>  you will
                win.

            </div>
            <div className="font-another font-bold bg-white object  text-[#ff0000] w-fit p-1 rounded-md">
                <strong className="font-another">SECRET</strong>
            </div>

            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        martyr();
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function BackgroundCheckEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>

            <strong className="font-another font-bold  bg-white object w-fit p-1 rounded-md">
                According to the latest intel,</strong>

            <strong className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md text-[#ff0000]">
                {lobby.currentEvent.extra_players[0].nickname + " "}

                is an{" "}
                <strong className="font-another text-[#ff0000]">
                    {lobby.currentEvent.extra_players[0].allegiance}

                    .</strong>{" "}
            </strong>

            <strong className="font-another font-bold  bg-white object w-fit p-1 rounded-md">Make of this what you will.</strong>


            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function PickPocketEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function PickPocket(target) {
        console.log('Target', target)
        var details1 = player
        var details2 = {}
        Object.key(lobby.players).forEach(player => {
            if (player.nickname == target.nickname) {
                details2 = player
            }
        })
        details1.role = lobby.players[target].role
        details1.allegiance = lobby.players[target].allegiance
        details1.target = lobby.players[target].target
        details2.role = player.role
        details2.allegiance = player.allegiance
        details2.target = player.target
        eventAction(dispatch, lobbyCode, 'update', details1)
        eventAction(dispatch, lobbyCode, 'update', details2)
    }
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="overflow-hidden font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>


            <div className="font-another font-bold  bg-white object w-fit p-1 rounded-md">
                <strong className="font-another">{lobby.currentEvent.details}</strong>
            </div>
            <button
                className="bg-red-900 p-1 w-36 text-white rounded-lg"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showSelection();
                }}
            >
                Choose Target
            </button>

            <div
                id="eventSlide"
                className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out transition-all translate-y-full "
            >
                <img src={WaitingList} alt="sdas" className="h-full" />

                <div
                    id="SelectBox"
                    className="flex-wrap absolute justify-center w-48 top-[11%] left-[35%] space-y-2"
                >
                    {lobby.currentEvent.extra_players.map((player) => (
                        <button
                            className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                            onClick={() => {
                                PickPocket(player);
                                endEvent();
                            }}
                        >
                            {player.nickname}
                        </button>
                    ))}

                    <div
                        id="SelectBox"
                        className="flex-wrap absolute justify-center w-48 top-[11%] left-[35%] space-y-2"
                    >
                        {lobby.currentEvent.extra_players.map((player) => (
                            <button
                                className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                                onClick={() => {
                                    PickPocket(player);
                                    endEvent(dispatch, lobbyCode);
                                }}
                            >
                                {player.nickname}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex">
                <button
                    className="bg-red-900 p-1 w-20 text-white rounded-lg"
                    onClick={() => {
                        endEvent();
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}


function GagOrderEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    function gagPlayer(target) {
        console.log('Target', target)
        let details
        Object.keys(target).forEach(key => {
            details[key] = target[key]
        })
        details.role = "NoVote"
        eventAction(dispatch, lobbyCode, 'update', details)
    }
    return (
        <div className="overflow-hidden  font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>

            <button
                className="bg-green-900 p-1 w-36 text-white rounded-lg"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showSelection();
                }}
            >Choose Target
            </button>
            <div
                id="eventSlide"
                className="flex-col absolute text-center flex h-auto rounded w-full duration-1000 ease-out transition-all translate-y-full "
            >
                <img src={WaitingList} alt="sdas" className="h-full" />

                <div
                    id="SelectBox"
                    className="flex-wrap absolute justify-center w-1/2 top-[11%] left-[25%] space-y-2"
                >
                    {lobby.currentEvent.extra_players.map((player) => (
                        <button
                            className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                            onClick={() => {
                                gagPlayer(player);
                                //EmitGag();
                                endEvent();
                            }}
                        >
                            {player.nickname}
                        </button>
                    ))}
                </div>

            </div>

            <div className="flex">
                <button
                    className="bg-red-900 p-1 w-20 text-white rounded-lg"
                    onClick={() => {
                        endEvent();
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}

function BlackMarkEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function markPlayer(target) {
        console.log('Target', target)
        var details = target
        eventAction(dispatch, lobbyCode, 'vote', details)
    }
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="overflow-hidden  font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>

            <button
                className="bg-green-900 p-1 w-36 text-white rounded-lg"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showSelection();
                }}
            >
                Choose Target
            </button>
            <div
                id="eventSlide"
                className="flex-col absolute text-center flex h-auto rounded w-full duration-1000 ease-out transition-all translate-y-full "
            >
                <img src={WaitingList} alt="sdas" className="h-full" />

                <div
                    id="SelectBox"
                    className="flex-wrap absolute justify-center w-1/2 top-[11%] left-[25%] space-y-2"
                >
                    {lobby.currentEvent.extra_players.map((player) => (
                        <button
                            className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                            onClick={() => {
                                markPlayer(player);
                                //EmitGag();
                                endEvent();
                            }}
                        >
                            {player.nickname}
                        </button>
                    ))}
                </div>
                <div className="overflow-y-hidden absolute bottom-0 h-[816px] w-[650px] right-[21.4vw]">
                    <div
                        id="eventSlide"
                        className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out transition-all translate-y-full "
                    >
                        {lobby.currentEvent.extra_players.map((player) => (
                            <button
                                className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                                onClick={() => {
                                    markPlayer(player);
                                    //EmitMark();
                                    endEvent(dispatch, lobbyCode);
                                }}
                            >
                                {player.nickname}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            <div className="flex">
                <button
                    className="bg-red-900 p-1 w-20 text-white rounded-lg"
                    onClick={() => {
                        endEvent();
                    }}
                >
                    Done
                </button>
            </div>
        </div >


    );
}

function CoupEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function coup() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        function getUserName() {
            const players = lobby.players
            Object.keys(players).forEach(player => {
                if (lobby.currentEvent.extra_players[0].nickname == players[player].nickname) {
                    return player
                }
            })
        }
        details.target = getUserName()
        details.role = "Coup"
        eventAction(dispatch, lobbyCode, 'update', details)
    }

    return (
        <div className="overflow-hidden  font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>

            <div className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                <strong className="font-another">
                    <strong className="font-another text-[#ff0000]">
                        {lobby.currentEvent.extra_players[0].nickname}
                    </strong>{" "}
                    has outlived the need for their service.
                </strong>
            </div>
            <div className="font-another font-bold  bg-white object w-fit p-1 rounded-md">
                <strong className="font-another">Make sure they are eliminated</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another">To win they must be eliminated</strong>
            </div>
            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        coup()
                        endEvent(dispatch, lobbyCode);
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function BlackmailedEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function blackmail() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        function getUserName() {
            const players = lobby.players
            Object.keys(players).forEach(player => {
                if (lobby.currentEvent.extra_players[0].nickname == players[player].nickname) {
                    return player
                }
            })
        }
        details.target = getUserName()
        details.role = "Blackmail"
        eventAction(dispatch, lobbyCode, 'update', details)
    }
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="font-another font-bold bg-white object w-fit p-1 rounded-md">{lobby.currentEvent.details}</strong>


            <p className="font-another font-bold  bg-white object w-fit p-1 rounded-md">Until you can prevent what they know from spreading, they must come
                out ahead.</p>

            <strong className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">You lose if they lose.</strong>


            <strong className="text-[#ff0000] font-another font-bold bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.extra_players[0].nickname} knows too much.</strong>{" "}

            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        blackmail();
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div >
    );
}

function BodyGuardEvent() {
    const dispatch = useDispatch()
    const { player, lobby, lobbyCode } = useSelector(state => state.game)
    function bodyguard() {
        let details = {}
        Object.keys(player).forEach(key => {
            details[key] = player[key]
        })
        function getUserName() {
            const players = lobby.players
            Object.keys(players).forEach(player => {
                if (lobby.currentEvent.extra_players[0].nickname == players[player].nickname) {
                    return player
                }
            })
        }
        details.target = getUserName()
        details.role = "Guard"
        eventAction(dispatch, lobbyCode, 'update', details)
    }
    return (
        <div className="font-another absolute right-[22.5%] top-[8%] h-[44%] w-[31%] flex flex-col justify-between">
            <h1 className="font-another font-bold text-2xl bg-white object w-fit p-1 rounded-md">
                {lobby.currentEvent.event_name}
            </h1>


            <strong className="font-another font-bold text-xl bg-white object w-fit p-1 rounded-md">
                <strong className="font-another text-[#ff0000]">
                    {lobby.currentEvent.extra_players[0].nickname}
                </strong>{" "}
                has employed your protection.
            </strong>

            <strong className="font-another font-bold  bg-white object w-fit p-1 rounded-md">They must survive.</strong>



            <strong className="font-another font-bold text-xl bg-white object w-fit p-1 rounded-md">
                If they are not voted out you win.
            </strong>

            <div className="flex">
                <button
                    className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        bodyguard();
                        endEvent(dispatch, lobbyCode);
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default function EventMap() {
    const { lobby } = useSelector(state => state.game)
    switch (lobby.currentEvent.event_function) {
        case "OldEnemies":
            return <OldEnemiesEvent />;
        case "OldAllies":
            return <OldAlliesEvent />;
        case "DeepState":
            return <DeepStateEvent />;
        case "SplinterCell":
            return <SplinterCellEvent />;
        case "BackroomDeal":
            return <BackroomDealEvent />;
        case "Martyr":
            return <MartyrEvent />;
        case "BackgroundCheck":
            return <BackgroundCheckEvent />;
        case "PickPocket":
            return <PickPocketEvent />;
        case "GagOrder":
            return <GagOrderEvent />;
        case "BlackMark":
            return <BlackMarkEvent />;
        case "Coup":
            return <CoupEvent />;
        case "Blackmailed":
            return <BlackmailedEvent />;
        case "BodyGuard":
            return <BodyGuardEvent />;
        default:
            break;
    }
}

function eventAction(dispatch, lobbyCode, type, playerChanges) {
    dispatch(sendAction(lobbyCode, type, playerChanges))
}

function endEvent(dispatch, lobbyCode,) {
    dispatch(sendAction(lobbyCode, 'progress'))
}

function excludePlayer(player) {
    return function (p) {
        return p.nickname != player.nickname;
    };
}

function OriginalAllies(player) {
    return function (p) {
        return p.original === player.original;
    };
}

function OriginalEnemies(player) {
    return function (p) {
        return p.original != player.original;
    };
}

export function EventGenMap(eventName, player, players) {
    const event = Events[eventName]; //fetch event strings

    const valid = players.filter(excludePlayer(player));
    let extra_players;
    switch (eventName) {
        case "OldAllies": //Started game on the same team
            extra_players = getSameStartTeam(valid);
            break;
        case "OldEnemies": //Started the game as enemies
            extra_players = getOppStartTeams(valid);
            break;
        case "DeepState": // Swap team- Hidden event
            break;
        case "SplinterCell": // Turns player to standalone - Hidden event
            break;
        case "BackroomDeal": // Can choose to betray team, cannot vote if so
            break;
        case "Martyr": //Will die for the cause - Hidden event
            break;
        case "BackgroundCheck": // Current appeared allegience
            extra_players = SinglePlayer(valid);
            break;
        case "PickPocket": // Swap allegiences with player of choice, if possible
            extra_players = valid;
            break;
        case "GagOrder": //Prevent a player of choice from voting
            extra_players = valid;
            break;
        case "BlackMark": //Give an extra vote to player of choice
            extra_players = valid;
            break;
        case "Coup": //Given player must be elminated to win - Hidden event
            extra_players = SinglePlayer(valid);
            break;
        case "Blackmailed": //Given player must win in order to win
            extra_players = SinglePlayer(valid);
            break;
        case "BodyGuard": //Given player cannot be voted out in order to win
            extra_players = SinglePlayer(valid);
            break;
        default:
            break;
    }

    //arrange data into expected format for events
    let eventObject = {
        player: player,
        extra_players: extra_players,
        blind_name: event.BlindName,
        event_name: event.EventTitle,
        blind_info: event.BlindInfo,
        details: event.Details,
        event_function: eventName,
    };
    return eventObject;
}

function GenerateEvents({ lobby_state }) {
    let events = [];
    lobby_state.players.forEach(player => {
        const eventName = RandomUniqueEvent(events);
        const event = EventGenMap(eventName, player, lobby_state.players);
        events.push(event);
    });
}

export function OutsideEvent() {
    const { lobby } = useSelector(state => state.game)
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (

        <div className="bg-event_waiting h-screen bg-cover">
            <div className="absolute bottom-0 left-[10%] h-4/5 ">
                <p className="font-another text-white text-3xl absolute bg-yellow-700 text-center w-[80%] ml-[10%] mt-[10%]">{lobby.currentEvent.blind_name}</p>
                <img src={Avatar} alt="player in the room" className="absolute rounded-full bg-transparent h-[20%] mt-[30%] ml-[30%]" />
                {/* avatar of user inside bro idk how to access it! */}
                <img src={OpenDoor} alt="Open Door" className="h-full hover:shadow-xl hover:cursor-pointer hover:shadow-slate-50" onClick={() => showSelection()} />
            </div>
            <div className="absolute bottom-0 h-[816px] w-[650px] right-[100px] overflow-y-hidden ">
                <div id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out bottom-0 transition-all translate-y-full ">
                    <img src={WaitingList} alt="sdas" className="h-full" />
                    <div className="w-[430px] m-auto max-w-[430px]">
                        <strong className="absolute top-[20%] text-center text-3xl h-[300px] font-another max-w-[430px] text-white">{lobby.currentEvent.blind_info}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSameStartTeam(players) {
    console.log(players);
    const p1 = players[Math.floor(Math.random() * players.length)]; //select valid players
    console.log(p1);
    const valid = players.filter(excludePlayer(p1));
    console.log(valid);
    const validSecond = valid.filter(OriginalAllies(p1));
    console.log(validSecond);
    const p2 = validSecond[Math.floor(Math.random() * validSecond.length)];
    return [p1, p2];
}

function getOppStartTeams(players) {
    const p1 = players[Math.floor(Math.random() * players.length)]; //select valid players
    const validSecond = players.filter((p) => {
        return p.original != p1.original;
    });
    const p2 = validSecond[Math.floor(Math.random() * validSecond.length)];
    return [p1, p2];
}

function SinglePlayer(players) {
    return [players[Math.floor(Math.random() * players.length)]]; //select valid players
}

function RandomUniqueEvent(events) {
    let keys = Object.keys(Events);
    let event = Events[keys[Math.floor(Math.random() * keys.length)]];
    while (events.includes(event)) {
        event = Events[keys[Math.floor(Math.random() * keys.length)]];
    }
    return event;
}
