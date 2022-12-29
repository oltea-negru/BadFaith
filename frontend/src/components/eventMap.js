import React from "react";

const PrivateCall = ["There is a private phone call for this player.", <br />, "They will be with back shortly."];

const Events = {
    OldAllies: {
        BlindName: "Old Allies",
        BlindInfo: "Two players are revelead to have appeared as the same team at the start",
        Details: ""
    },
    OldEnemies: {
        BlindName: "Old Enemies",
        BlindInfo: "Two players are revelead to have appeared on opposite teams at the start",
        Details: ""
    },
    DeepState: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        Details: "Deep State",
    },
    SplinterCell: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        Details: "Splinter Cell"
    },
    BackroomDeal: {
        BlindName: "Backroom Deal",
        BlindInfo: ["Their loyalty is being put to the test.", <br />, "Is it strong enough?"],
        Details: ["You have the option to switch teams, but if you do so you cannot vote.", <br />, "Do you accept?"]
    },
    Martyr: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        Details: "You have been chosen as a Martyr, get yourself voted and you will be rewarded."
    },
    BackgroundCheck: {
        BlindName: "Background Check",
        BlindInfo: "We have done a little digging. Here is what we know..."
    },
    PickPocket: {
        BlindName: "Pick Pocket",
        BlindInfo: "Select a player to swap roles with"
    },
    PrivateDiscussion: {
        BlindName: "Private Discussion",
        BlindInfo: "Select a player to share your secrets with"
    },
    GagOrder: {
        BlindName: "Gag Order",
        BlindInfo: "Someone is being a little too loud. Use this opportunity to prevent them from voting."
    },
    BlackMark: {
        BlindName: "Black Mark",
        BlindInfo: "Choose a player to add an extra vote against"
    },
    Coup: {
        BlindName: "Private Call",
        BlindInfo: PrivateCall,
        Details: "Coup d'état"
    },
    Blackmailed: {
        BlindName: "Blackmailed",
        BlindInfo: "Another player has some dirt on you that cannot come to light, you will only win if they do.",
    },
    BodyGuard: {
        BlindName: "Bodyguard",
        BlindInfo: "You have been employed to protect another. They cannot be voted out."
    }
};

function OldEnemiesEvent({ event_data }) {
    return (
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.extra_players[0].nickname} is an old enemy of {event_data.extra_players[1].nickname}.</strong>
                <br></br>
                <strong>They would never knowingly work together.</strong>
            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.extra_players[0].nickname} is an old ally of {event_data.extra_players[1].nickname}.</strong>
                <br></br>
                <strong>Their last meeting was as friends, not foes.</strong>
            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.details}</strong>
                <br></br>
                <strong>Your mission is over, you may return to you're true allegiance</strong>
                <br></br>
                <strong>Your Role: </strong>
                <strong>{event_data.player.allegiance}</strong>
            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.details}</strong>
                <br></br>
                <p>You have broken away from all allegiances and now stand alone.<br />
                    You must avoid being voted out to win
                </p>
                <h2><b>SURVIVE AT ALL COSTS</b></h2>
            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.details}</strong>
                <br />
                <strong> Current Team: {event_data.player.allegiance}</strong>
            </div>
            <div className="Event-Actions">
                <button className="Loyal"
                    onClick={() => {
                        Remain();
                    }}
                >Remain
                </button>
                <button className="Betray"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>{event_data.details}</strong>
                <p>You will only win if you are voted out, and you will win alone.</p>

            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
        <div className="EventWrapper">
            <div className="eventDetails">
                <strong>According to the latest intel, {event_data.extra_players[0].nickname} is an  {event_data.extra_players[0].allegiance}.</strong>
                <br></br>
                <strong>Make of this what you will.</strong>
            </div>
            <div className="Event-Actions">
                <button className="Finish"
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
    return (
        <div className="EventWrapper">
            <div className="eventDetails">
                <div className="SelectBox">
                    {event_data.extra_players.map((player) =>
                        <button
                            className="PlayerSelect"
                            onClick={() => {
                                PickPocket(player);
                                endEvent();
                            }
                            }
                        >{player.nickname}</button>)}
                </div>
            </div>

        </div>
    );
}

function PrivateDiscussionEvent({ event_data }) {
    let discussionPlayers = new Array();
    discussionPlayers.push(event_data.player);
    function DiscussionDisplay(player) {
        
        const selectBox = document.querySelector(".SelectBox");
        const discussionBox = document.querySelector(".Discussion");
        selectBox.classList.toggle("toggle");//Hide selection
        discussionBox.classList.toggle("toggle");//Show details for each player
    }
    return (
        <div className="EventWrapper">
            <div className="eventDetails">
                <div className="SelectBox">
                    {event_data.extra_players.map((player) =>
                        <button
                            className="PlayerSelect"
                            onClick={() => {
                                discussionPlayers.push(player);
                                DiscussionDisplay(player);
                            }
                            }
                        >{player.nickname}</button>)}
                </div>
                <div className="Discussion">
                    {discussionPlayers.map((player) =>
                        <div className="Player">
                            <strong>{player.nickname}</strong>
                            <br/>
                            <strong>Allegience: {player.allegiance}</strong>
                        </div>)}
                </div>
            </div>

        </div>
    );
}

function GagOrderEvent({ event_data }) {

}

function BlackMarkEvent({ event_data }) {

}

function CoupEvent({ event_data }) {

}

function BlackmailedEvent({ event_data }) {

}

function BodyGuardEvent({ event_data }) {

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
        case "PrivateDiscussion":
            return <PrivateDiscussionEvent event_data={current_event} />;
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
    const eventInfo = document.querySelector(".Event-Info");
    eventInfo.classList.toggle("toggle");

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
        case "PrivateDiscussion": //Compare allegience with another player
            extra_players = valid;
            break;
        case "GagOrder": //Prevent a player of choice from voting
            extra_players = valid;
            break;
        case "BlackMark":
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
        name: event.BlindName,
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
