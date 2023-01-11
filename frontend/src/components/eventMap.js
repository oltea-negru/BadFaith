import React, { useState } from "react";
import WaitingList from "../assets/svg/EventBoardComponent.svg";
const PrivateCall = ["There is a private phone call for this player.", <br />, "They will be with back shortly."];

const Events = {
    OldAllies: {
        BlindName: "Old Allies",
        EventTitle: "Old Allies",
        BlindInfo: "Two players are revelead to have appeared as the same team at the start",
        Details: "Two players are revelead to have appeared as the same team at the start"
    },
    OldEnemies: {
        BlindName: "Old Enemies",
        EventTitle: "Old Enemies",
        BlindInfo: "Two players are revelead to have appeared on opposite teams at the start",
        Details: "Two players are revelead to have appeared on opposite teams at the start",
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
        Details: "Splinter Cell"
    },
    BackroomDeal: {
        BlindName: "Backroom Deal",
        EventTitle: "Backroom Deal",
        BlindInfo: ["Their loyalty is being put to the test.", <br />, "Is it strong enough?"],
        Details: ["You have the option to switch teams, but if you do so you cannot vote.", <br />, "Do you accept?"]
    },
    Martyr: {
        BlindName: "Private Call",
        EventTitle: "Martyr",
        BlindInfo: PrivateCall,
        Details: "You have been chosen as a Martyr, get yourself voted and you will be rewarded."
    },
    BackgroundCheck: {
        BlindName: "Background Check",
        EventTitle: "Background Check",
        BlindInfo: "We have done a little digging. Here is what we know..."
    },
    PickPocket: {
        BlindName: "Pick Pocket",
        EventTitle: "Pick Pocket",
        BlindInfo: "Select a player to swap roles with",
        Details: "Select a player to swap roles with"
    },
    GagOrder: {
        BlindName: "Gag Order",
        EventTitle: "Gag Order",
        BlindInfo: "Someone is being a little too loud. Use this opportunity to prevent them from voting.",
        Details: "Someone is being a little too loud. Use this opportunity to prevent them from voting."
    },
    BlackMark: {
        BlindName: "Black Mark",
        EventTitle: "Black Mark",
        BlindInfo: "Choose a player to add an extra vote against",
        Details: "Choose a player to add an extra vote against"
    },
    Coup: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        EventTitle: "Coup d'etat",
        Details: "Coup d'etat"

    },
    Blackmailed: {
        BlindName: "Blackmailed",
        EventTitle: "Blackmailed",
        BlindInfo: ["Another player has some dirt on you that cannot come to light.", <br />, "You will only win if they do."],
        Details: ["Another player has some dirt on you that cannot come to light.", <br />, "You will only win if they do."],
    },
    BodyGuard: {
        BlindName: "Bodyguard",
        EventTitle: "Bodyguard",
        BlindInfo: ["You have been employed to protect another.", <br />, "They cannot be voted out."]
    }
};

function OldEnemiesEvent({ event_data }) {
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another"><strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong> is an old enemy of <strong className="font-another text-[#ff0000]">{event_data.extra_players[1].nickname}</strong>.</strong>
                <br></br>
                <strong className="font-another">They would never knowingly work together.</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done</button>
            </div>
        </div>
    );
}

function OldAlliesEvent({ event_data }) {

    // console.log(event_data.extra_players);
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong><strong className="font-another"><br /> is an old ally of <strong className="font-another text-[#ff0000]">{event_data.extra_players[1].nickname}</strong>.</strong>
                <br></br>
                <strong className="font-another">Their last meeting was as friends.</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function DeepStateEvent({ event_data }) {
    //update state to switch player allegiance
    if (event_data.player.allegiance == "Enemy") {
        event_data.player.allegiance = "Ally";
    }
    else if (event_data.player.allegiance == "Ally") {
        event_data.player.allegiance = "Enemy";
    }
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">Your mission is over,<br /> you may return to you're true allegiance</strong>
                <br></br>
            </div>
            <div className="absolute h-24 w-64 text-center text-[#ff0000] text-2xl top-[22vh] right-[46vw] -rotate-9 m-auto">
                <strong className="font-another">SECRET</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another">Your Team:<br /> </strong>
                <strong className="font-another text-[#ff0000]">{event_data.player.allegiance}</strong>
            </div>


            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function SplinterCellEvent({ event_data }) {
    event_data.player.allegiance = "Splinter";
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <p className="font-another text-xl">You have broken away from all allegiances and now stand alone.<br />
                    You must avoid being voted out to win
                </p>
                <h2 className="font-another text-[#ff0000] text-center"><b>SURVIVE AT ALL COSTS</b></h2>
            </div>
            <div className="absolute h-24 w-64 text-center text-[#ff0000] text-2xl top-[22vh] right-[46vw] -rotate-9 m-auto">
                <strong className="font-another">SECRET</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function BackroomDealEvent({ event_data }) {
    function Betray() {
        if (event_data.player.allegiance == "Ally") {
            event_data.player.allegiance = "Enemy";
        }
        else if (event_data.player.allegiance == "Enemy") {
            event_data.player.allegiance = "Ally";
        }
        // DisableVote(event_data.player); prevent this player from being able to vote
        endEvent();

    }

    function Remain() {
        endEvent();
    }

    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">{event_data.details}</strong>
                <br />

            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another"> Your Team:<br /><strong className="font-another text-[#ff0000]">{event_data.player.allegiance}</strong></strong>
            </div>

            <div className="flex">
                <button className="font-another absolute p-1 bg-transparent justify-center m-auto text-2xl top-[50vh] right-[38.5vw] w-[4.5vw] h-[6.8vh] min-w-[75px] hover:text-[#ff0000]"
                    onClick={() => {
                        Remain();
                    }}
                >Remain
                </button>
                <button className="font-another absolute p-1 bg-transparent justify-center m-auto text-2xl top-[46.1vh] right-[21.4vw] w-[4vw] h-[10.5vh] min-w-[75px] -rotate-10 hover:text-[#ff0000]"
                    onClick={() => {
                        Betray();
                    }}
                >Betray
                </button>
            </div>
        </div>
    );
}

function MartyrEvent({ event_data }) {
    event_data.player.allegiance = "Splinter";
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">{event_data.details}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another">If you win, <strong className="font-another text-[#ff0000]">only</strong> you will win.</strong>
            </div>
            <div className="absolute h-24 w-64 text-center text-[#ff0000] text-2xl top-[22vh] right-[46vw] -rotate-9 m-auto">
                <strong className="font-another">SECRET</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function BackgroundCheckEvent({ event_data }) {
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">According to the latest intel,<br /> <strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong> is an  <strong className="font-another text-[#ff0000]">{event_data.extra_players[0].allegiance}</strong>.</strong>
                <br></br>
                <strong className="font-another">Make of this what you will.</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function PickPocketEvent({ event_data }) {
    function PickPocket(target) {
        const op1 = event_data.player;
        const op2 = target;
        /*
        State changes: allegience role and target of op1 to be swapped with op2
        */
    }
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">{event_data.details}</strong>
            </div>
            <div className="absolute p-2 text-2xl overflow-hidden top-[50vh] w-[21vh] right-[43.3vw]">
                <button
                    className="font-another -rotate-6 hover:text-[#ff0000]"
                    id="chatButton"
                    onClick={() => {
                        // UpdateChat(chatMessage)
                        // setMessage('');
                        showSelection();
                    }}>Choose Target</button>
            </div>
            <div className="overflow-y-hidden absolute bottom-0 h-[816px] w-[650px] right-[21.4vw]">
                <div id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out transition-all translate-y-full ">
                    <img src={WaitingList} alt="sdas" className="h-full" />

                    <div id="SelectBox"
                        className="flex-wrap absolute justify-center w-48 top-[11%] left-[35%] space-y-2">
                        {event_data.extra_players.map((player) =>
                            <button
                                className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                                onClick={() => {
                                    PickPocket(player);
                                    endEvent();
                                }
                                }
                            >{player.nickname}</button>)}
                    </div>
                </div>
            </div>


        </div >
    );
}





function GagOrderEvent({ event_data }) {
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    const [gagSelect, setGag] = useState();
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">{event_data.details}</strong>
            </div>
            <div className="absolute p-2 text-2xl overflow-hidden top-[50vh] w-[21vh] right-[43.3vw]">
                <button
                    className="font-another -rotate-6 hover:text-[#ff0000]"
                    id="chatButton"
                    onClick={() => {
                        // UpdateChat(chatMessage)
                        // setMessage('');
                        showSelection();
                    }}>Choose Target</button>
            </div>
            <div className="overflow-y-hidden absolute bottom-0 h-[816px] w-[650px] right-[21.4vw]">
                <div id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out transition-all translate-y-full ">
                    <img src={WaitingList} alt="sdas" className="h-full" />

                    <div id="SelectBox"
                        className="flex-wrap absolute justify-center w-48 top-[11%] left-[35%] space-y-2">
                        {event_data.extra_players.map((player) =>
                            <button
                                className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                                onClick={() => {
                                    setGag(player);
                                    //EmitGag();
                                    endEvent();
                                }}
                            >{player.nickname}</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function BlackMarkEvent({ event_data }) {
    const [mark, setMark] = useState();
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another">{event_data.details}</strong>
            </div>
            <div className="absolute p-2 text-2xl overflow-hidden top-[50vh] w-[21vh] right-[43.3vw]">
                <button
                    className="font-another rotate-6 hover:text-[#ff0000]"
                    id="chatButton"
                    onClick={() => {
                        // UpdateChat(chatMessage)
                        // setMessage('');
                        showSelection();
                    }}>Choose Target</button>
            </div>
            <div className="overflow-y-hidden absolute bottom-0 h-[816px] w-[650px] right-[21.4vw]">
                <div id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out transition-all translate-y-full ">
                    <img src={WaitingList} alt="sdas" className="h-full" />

                    <div id="SelectBox"
                        className="flex-wrap absolute justify-center w-48 top-[11%] left-[35%] space-y-2">
                        {event_data.extra_players.map((player) =>
                            <button
                                className="font-another p-1 bg-white justify-center m-auto w-48 rounded-2xl text-2xl hover:text-[#ff0000]"
                                onClick={() => {
                                    setMark(player);
                                    //EmitMark();
                                    endEvent();
                                }}
                            >{player.nickname}</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CoupEvent({ event_data }) {
    event_data.player.target = event_data.extra_players[0];
    event_data.player.type = "vote";

    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another"><strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong> has outlived the need for their service.</strong><br />
                <strong className="font-another">Make sure they are eliminated</strong><br />
            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another">To win they must be eliminated</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function BlackmailedEvent({ event_data }) {
    event_data.player.target = event_data.extra_players[0];
    event_data.player.type = "win";
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-lg top-[16vh] w-[21vh] right-[43.5vh] ">
                <strong className="font-another">{event_data.details}</strong><br />
                <strong >Until you can prevent what they know from spreading, they must come out ahead.</strong>
            </div>
            <div className="absolute rotate-10 p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] ">
                <strong className="font-another">You lose if they lose.</strong>
            </div>
            <div className="absolute p-2 text-xl top-[50vh] w-[18vh] right-[45.1vw] -rotate-6">
                <strong className="font-another"><strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong> knows too much.</strong><br />
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

function BodyGuardEvent({ event_data }) {
    event_data.player.target = event_data.extra_players[0];
    event_data.player.type = "lives";
    return (
        <div className="p-4 m-auto">
            <div className="absolute h-24 w-64 text-center top-[31vh] right-[39vw]">
                <strong className="font-another relative text-2xl top-[35%]">{event_data.event_name}</strong>
            </div>
            <div className="absolute p-2 text-2xl top-[16vh] w-[21vh] right-[43.5vh]">
                <strong className="font-another"><strong className="font-another text-[#ff0000]">{event_data.extra_players[0].nickname}</strong> has employed your protection.</strong><br />
                <strong className="font-another">They must survive.</strong><br />

            </div>
            <div className="absolute p-2 text-2xl top-[47vh] w-[7.5vw] right-[26.6vw] rotate-10">
                <strong className="font-another">If they are not voted <br />out you win.</strong>
            </div>
            <div className="flex">
                <button className="font-another absolute w-20 h-12 text-2xl p-1 bg-white justify-center m-auto hover:text-[#ff0000] rounded-2xl top-[60vh] left-[60vh]"
                    onClick={() => {
                        endEvent();
                    }}
                >Done
                </button>
            </div>
        </div>
    );
}

export default function EventMap(current_event) {
    const key = current_event.event_function;
    switch (key) {
        case "OldEnemies":
            return <OldEnemiesEvent event_data={current_event} />;
        case "OldAllies":
            return <OldAlliesEvent event_data={current_event} />;
        case "DeepState":
            return <DeepStateEvent event_data={current_event} />;
        case "SplinterCell":
            return <SplinterCellEvent event_data={current_event} />;
        case "BackroomDeal":
            return <BackroomDealEvent event_data={current_event} />;
        case "Martyr":
            return <MartyrEvent event_data={current_event} />;
        case "BackgroundCheck":
            return <BackgroundCheckEvent event_data={current_event} />;
        case "PickPocket":
            return <PickPocketEvent event_data={current_event} />;
        case "GagOrder":
            return <GagOrderEvent event_data={current_event} />;
        case "BlackMark":
            return <BlackMarkEvent event_data={current_event} />;
        case "Coup":
            return <CoupEvent event_data={current_event} />;
        case "Blackmailed":
            return <BlackmailedEvent event_data={current_event} />;
        case "BodyGuard":
            return <BodyGuardEvent event_data={current_event} />;
        default:
            break;
    }
}

function endEvent() {
    const eventInfo = document.querySelector("#Event-Info");
    eventInfo.classList.toggle("hidden");
    //insert emits to progress game state
}

function excludePlayer(player) {
    return function (p) {
        return p.nickname != player.nickname;
    }
}

function OriginalAllies(player) {
    return function (p) {
        return p.original === player.original;
    }
}

function OriginalEnemies(player) {
    return function (p) {
        return p.original != player.original;
    }
}

export function EventGenMap(eventName, player, players) {
    const event = Events[eventName];//fetch event strings
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
    }
    let eventObject = { //arrange data into expected format for events
        player: player,
        extra_players: extra_players,
        blind_name: event.BlindName,
        event_name: event.EventTitle,
        blind_info: event.BlindInfo,
        details: event.Details,
        event_function: eventName
    };
    return eventObject;
}

function GenerateEvents({ lobby_state }) {
    let events = new Array();
    lobby_state.players.forEach(player => {
        const eventName = RandomUniqueEvent(events);
        const event = EventGenMap(eventName, player, lobby_state.players);
        events.push(event);
    });
}

export function OutsideEvent({ event_data }) {
    function showSelection() {
        const chat = document.querySelector("#eventSlide");
        chat.classList.toggle("translate-y-full");
        console.log("Toggled");
    }
    return (
        <div className="p-4 m-auto">
            <button className="absolute top-[516px] left-[370px] w-[385px] h-[100px] grid content-center text-center text-4xl text-white font-another"
                id="chatButton"
                onClick={() => {
                    // UpdateChat(chatMessage)
                    // setMessage('');
                    showSelection();
                }}>{event_data.blind_name}
            </button>
            <div className="absolute top-[700px] left-[370px] w-[385px] h-[100px] grid content-center text-center text-4xl text-white font-another">
                ReplaceWithAvatar
            </div>
            <div className="absolute bottom-0 h-[816px] w-[650px] right-[1000px] overflow-y-hidden ">
                <div id="eventSlide"
                    className="flex-col absolute flex h-auto rounded w-[650px] duration-1000 ease-out bottom-0 transition-all translate-y-full ">
                    <img src={WaitingList} alt="sdas" className="h-full" />
                    <div className="w-[430px] m-auto max-w-[430px]">
                        <strong className="absolute top-[20%] text-center text-3xl h-[300px] font-another max-w-[430px] text-white">{event_data.blind_info}</strong>
                    </div>

                </div>
            </div>
        </div >
    )
}

function getSameStartTeam(players) {
    console.log(players);
    const p1 = players[Math.floor((Math.random() * players.length))]; //select valid players
    console.log(p1);
    const valid = players.filter(excludePlayer(p1));
    console.log(valid);
    const validSecond = valid.filter(OriginalAllies(p1));
    console.log(validSecond);
    const p2 = validSecond[Math.floor((Math.random() * validSecond.length))];
    return [p1, p2];
}

function getOppStartTeams(players) {
    const p1 = players[Math.floor((Math.random() * players.length))]; //select valid players
    const validSecond = players.filter(p => {
        return p.original != p1.original;
    });
    const p2 = validSecond[Math.floor((Math.random() * validSecond.length))];
    return [p1, p2];
}

function SinglePlayer(players) {
    return [players[Math.floor((Math.random() * players.length))]]; //select valid players
}

function RandomUniqueEvent(events) {
    let keys = Object.keys(Events);
    let event = Events[keys[Math.floor((Math.random() * keys.length))]];
    while (events.includes(event)) {
        event = Events[keys[Math.floor((Math.random() * keys.length))]];
    }
    return event;
}