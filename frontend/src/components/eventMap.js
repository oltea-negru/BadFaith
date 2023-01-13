import React from "react";
import WaitingList from "../assets/svg/EventBoardComponent.svg";
import OpenDoor from "../assets/svg/EnterEventDoorComponent.svg";
import Avatar from "../assets/avatars/avatar-1.svg";
import { useDispatch, useSelector } from "react-redux";
import { sendAction } from "../redux/middleware/gameServerMiddleware";

function OldEnemiesEvent() {
    const dispatch = useDispatch();
    const { lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="smallInfo">
                {details}
            </strong>
            <p className="bigInfo">
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[0].nickname + " "}</strong><br />
                is an old enemy of
                <br />
                <strong className="text-red-500">
                    {" " + lobby.currentEvent.extra_players[1].nickname}
                </strong>{" "}
            </p>
            <strong className="smallInfo">
                They would never knowingly work together.
            </strong>


            <button
                className="done"
                onClick={() => {
                    endEvent(dispatch, lobbyCode);
                }}
            >
                Done
            </button>
        </div >
    );
}

function OldAlliesEvent() {
    const dispatch = useDispatch();
    const { lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    return (
        <div className="board">
            <h1 className="eventTitle">{lobby.currentEvent.event_name}</h1>
            <strong className="smallInfo">{details}</strong>
            <p className="bigInfo">
                <strong className=" text-red-500 ">
                    {lobby.currentEvent.extra_players[0].nickname + " "}
                </strong>
                is an old ally of{" "}
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[1].nickname}
                </strong>
                .
            </p>
            <p className="smallInfo">Their last meeting was as friends.</p>

            <button
                className="done"
                onClick={() => {
                    endEvent(dispatch, lobbyCode);
                }}
            >
                Done
            </button>
        </div>
    );
}

function DeepStateEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    function deepState() {
        let details = {...player};
        console.log('Player', player);
        Object.keys(player).forEach((key) => {
            details[key] = player[key];
        });
        switch (details.allegiance) {
            case "Ally":
                details.allegiance = "Enemy";
                break;
            case "Enemy":
                details.allegiance = "Ally";
                break;
            default:
                break;
        }
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }

    return (
        <div className="board">
            <h1 className="eventTitle">{lobby.currentEvent.event_name}</h1>
            <p className="smallInfo">Your mission is over.</p>
            <p className="secret">S E C R E T</p>

            <p className="bigInfo">
                Your Team:
                <strong className="bigInfo text-red-500">
                    {lobby.currentEvent.player.allegiance}
                </strong>
                .
            </p>

            <button
                className="done"
                onClick={() => {
                    deepState();

                }}
            >
                Done
            </button>
        </div>
    );
}

function SplinterCellEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    function splinter() {
        let details = {...player};
        console.log('Player', player);
        Object.keys(player).forEach((key) => {
            details[key] = player[key];
        });
        details.allegiance = "Splinter";
        console.log("SendingUpdateDetails", details);
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }
    return (
        <div className="board">
            <h1 className="eventTitle">{lobby.currentEvent.event_name}</h1>
            <p className="smallInfo">You have broken away from all allegiances...</p>
            <p className="smallInfo">And now stand alone.</p>
            <p className="bigInfo">You must avoid being voted out to win!</p>
            <h2 className="text-red-500 bigInfo">
                SURVIVE AT ALL COSTS
            </h2>
            <strong className="secret -translate-y-2 translate-x-3">S E C R E T</strong>

            <button
                className="done"
                onClick={() => {
                    splinter();

                }}
            >
                Done
            </button>
        </div>
    );
}

function BackroomDealEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    function Betray() {
        // Swap
        let details = {...player};
        console.log('Player', player);
        Object.keys(player).forEach((key) => {
            details[key] = player[key];
        });
        switch (details.allegiance) {
            case "Ally":
                details.allegiance = "Enemy";
                break;
            case "Enemy":
                details.allegiance = "Ally";
                break;
            default:
                break;
        }
        details.role = "Betray";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);

    }

    function Remain() {
        endEvent(dispatch, lobbyCode);
    }

    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>

            <p className="bigInfo">{details}</p>

            <p className="bigInfo">
                Your Team: <strong className="text-red-500">
                    {" " + lobby.currentEvent.player.allegiance}</strong>
            </p>
            <div className="flex">
                <button
                    className="done hover:bg-green-300 hover:text-black mr-3"
                    onClick={() => {
                        Remain();
                    }}
                >
                    Remain
                </button>
                <button
                    className="done hover:bg-red-300 hover:text-black"
                    onClick={() => {
                        Betray();
                    }}
                >
                    Betray
                </button>
            </div>
        </div>
    );
}

function MartyrEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    function martyr() {
        let details = {...player};
        console.log('Player', player);
        Object.keys(player).forEach((key) => {
            details[key] = player[key];
        });
        details.allegiance = "Splinter";
        details.role = "Martyr";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }
    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="smallInfo">
                {details}
            </strong>
            <div className="bigInfo">
                If you win,{" "}
                <strong className=" text-red-500">
                    only
                </strong>{" "}
                you will win.
            </div>
            <strong className="secret -translate-y-24">S E C R E T</strong>


            <button
                className="done"
                onClick={() => {
                    martyr();

                }}
            >
                Done
            </button>

        </div>
    );
}

function BackgroundCheckEvent() {
    const dispatch = useDispatch();
    const { lobby, lobbyCode } = useSelector((state) => state.game);
    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>

            <strong className="smallInfo">
                According to the latest intel,
            </strong>
            <p className="bigInfo">
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[0].nickname + " "}</strong>
                is an{" "}
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[0].allegiance}.
                </strong>{" "}

            </p>
            <strong className="smallInfo">
                Make of this what you will.
            </strong>


            <button
                className="done"
                onClick={() => {
                    endEvent(dispatch, lobbyCode);
                }}
            >
                Done
            </button>

        </div>
    );
}


function GagOrderEvent() {
    const dispatch = useDispatch();
    const { lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    function gagPlayer(target) {
        console.log("Target", target);
        let details;
        Object.keys(target).forEach((key) => {
            details[key] = target[key];
        });
        details.role = "NoVote";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }
    return (
        <div className="overflow-hidden  board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="smallInfo">
                {details}
            </strong>

            <button
                className="done hue-rotate-180"
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
                className="absolute bg-[#601822] h-full rounded-md  w-[87%] duration-1000 ease-out transition-all translate-y-full "
            >
                <div
                    id="SelectBox"
                    className="h-full w-full p-10 flex flex-col justify-center"
                >
                    {lobby.currentEvent.extra_players.map((player) => (
                        <button
                            className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-xl hover:text-2xl hover:bg-rose-600 hover:text-white"
                            onClick={() => {
                                showSelection();
                                gagPlayer(player);
                                //EmitGag();

                            }}
                        >
                            {player.nickname}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function BlackMarkEvent() {
    const dispatch = useDispatch();
    const { lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    function markPlayer(target) {
        console.log("Target", target);
        var details = target;
        console.log(details)
        eventAction(dispatch, lobbyCode, "vote", details);
    }
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="overflow-hidden board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="smallInfo">
                {details}
            </strong>

            <button
                className="done hue-rotate-180"
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
                className="absolute bg-[#601822] h-full rounded-md  w-[90%] duration-1000 ease-out transition-all translate-y-full "
            >
                <div
                    id="SelectBox"
                    className="h-full w-full p-10 flex flex-col justify-center"
                >
                    {lobby.currentEvent.extra_players.map((player) => (
                        <button
                            className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-xl hover:text-2xl hover:bg-rose-600 hover:text-white"
                            onClick={() => {
                                showSelection();
                                markPlayer(player);
                            }}
                        >
                            {player.nickname}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
}

function CoupEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    function coup() {
        let details = {...player};
        let target = lobby.currentEvent.extra_players[0].socketID
        function getUserName(target) {
            for (const [key, value] of Object.entries(lobby.players)) {
                if (value.socketID === target) return key
            }
        }
        details.target = getUserName(target);
        details.role = "Coup";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }

    return (
        <div className="overflow-hidden board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>

            <p className="bigInfo">
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[0].nickname + " "}
                </strong>
                has outlived the need for their service.
            </p>

            <div className="smallInfo">
                <strong className="font-another">Make sure they are eliminated...</strong>
            </div>

            <p className="bigInfo">And <strong className="text-red-500">YOU</strong> win!</p>


            <button
                className="done"
                onClick={() => {
                    coup();
                }}
            >
                Done
            </button>

        </div>
    );
}

function BlackmailedEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    const input = lobby.currentEvent.details
    let details = []
    input.forEach(string => {
        if (string === '<br />') {
            details.push(<br />)
        } else {
            details.push(string)
        }
    })
    function blackmail() {
        let details = {...player};
        let target = lobby.currentEvent.extra_players[0].socketID
        function getUserName(target) {
            for (const [key, value] of Object.entries(lobby.players)) {
                if (value.socketID === target) return key
            }
        }
        details.target = getUserName(target);
        details.role = "Blackmail";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }
    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>
            <strong className="smallInfo">
                {details}
            </strong>


            <p className="bigInfo">
                <strong className="text-red-500">{lobby.currentEvent.extra_players[0].nickname}</strong> knows too much...
            </p>{" "}
            <p className="smallInfo">
                You lose if they lose!
            </p>

            <button
                className="done"
                onClick={() => {
                    blackmail();
                }}
            >
                Done
            </button>

        </div>
    );
}

function BodyGuardEvent() {
    const dispatch = useDispatch();
    const { player, lobby, lobbyCode } = useSelector((state) => state.game);
    function bodyguard() {
        let details = {...player};
        let target = lobby.currentEvent.extra_players[0].socketID
        function getUserName(target) {
            for (const [key, value] of Object.entries(lobby.players)) {
                if (value.socketID === target) return key
            }
        }
        details.target = getUserName(target);
        details.role = "Guard";
        console.log(details)
        eventAction(dispatch, lobbyCode, "update", details);
    }
    return (
        <div className="board">
            <h1 className="eventTitle">
                {lobby.currentEvent.event_name}
            </h1>

            <p className="bigInfo">
                <strong className="text-red-500">
                    {lobby.currentEvent.extra_players[0].nickname}
                </strong>{" "}
                has employed your protection.
            </p>

            <strong className="smallInfo">
                They must survive.
            </strong>

            <strong className="bigInfo">
                If they are not voted out, you win!
            </strong>

            <button
                className="done"
                onClick={() => {
                    bodyguard();
                }}
            >
                Done
            </button>
        </div>
    );
}

export default function EventMap() {
    const { lobby } = useSelector((state) => state.game);
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
    dispatch(sendAction(lobbyCode, type, playerChanges));
}

function endEvent(dispatch, lobbyCode) {
    dispatch(sendAction(lobbyCode, 'progress'))
}

export function OutsideEvent() {
    const { lobby } = useSelector((state) => state.game);
    const input = lobby.currentEvent.blind_info
    let blindInfo = []
    input.forEach(string => {
        if (string === '<br />') {
            blindInfo.push(<br />)
        } else {
            blindInfo.push(string)
        }
    })
    console.log('BlindInfo', blindInfo)
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="bg-event_waiting h-screen bg-cover">
            <div className="absolute bottom-0 left-[10%] h-4/5 ">
                <p className="font-another text-white text-3xl absolute bg-yellow-700 text-center w-[80%] ml-[10%] mt-[10%]">
                    {lobby.currentEvent.blind_name}
                </p>
                <img
                    src={Avatar}
                    alt="player in the room"
                    className="absolute rounded-full bg-transparent h-[20%] mt-[30%] ml-[30%]"
                />
                {/* avatar of user inside bro idk how to access it! */}
                <img
                    src={OpenDoor}
                    alt="Open Door"
                    className="h-full hover:shadow-xl hover:cursor-pointer hover:shadow-slate-50"
                    onClick={() => showSelection()}
                />
            </div>
            <div className="absolute bottom-0 h-[822px] w-[650px] right-[40%] overflow-y-hidden ">
                <div
                    id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out bottom-0 transition-all translate-y-full "
                >
                    <img src={WaitingList} alt="sdas" className="h-full" />
                    <div className="w-[430px] m-auto max-w-[430px]">
                        <strong className="absolute top-[20%] text-center text-3xl h-[300px] font-another max-w-[430px] text-white">
                            {blindInfo}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

