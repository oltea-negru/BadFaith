import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../components/CurrentEvent.css';
import EventMap from "../components/eventMap";
import profilepic from "../assets/images/PlacholderIcon.png";
import { EventGenMap } from "../components/eventMap";



export default function CurrentEvent() {
    const lobby = useState([]);

    return (
        <div className="event">
            <div className="Blind-Info">
                <strong>{dummylobbyState.current_event.name}</strong>
                <p>{dummylobbyState.current_event.blind_info}</p>
            </div>

            <div className="Player-Info">
                <strong>{getPlayerNickname(dummylobbyState.current_event.player)}</strong>
                <img className="Profile-Image" src={profilepic} alt="placeholder profile" />
            </div>

            <div className="Event-Info">
                <div>
                    {EventMap(dummylobbyState.current_event)}
                </div>
            </div>

        </div>
    );
}



function getPlayerArray() {
    let playerArray = new Array();
    Object.keys(lobbyPlayers).forEach(player => {
        playerArray.push(lobbyPlayers[player]);
    })
    return playerArray;
}

var lobbyPlayers = {
    "DummyID": {
        nickname: "LoremIpsum",
        icon: "Figure this out",
        original: "Enemy",
        allegiance: "Enemy"
    },
    "Lorem": {
        nickname: "Sean Connery",
        icon: "Figure this out",
        original: "Enemy"
    },
    "Ipsum": {
        "nickname": "Travolta",
        "icon": "Figure this out",
        original: "Ally",
        allegiance: "",
        "target": "",
    },
    "Delta": {
        nickname: "Geronimo",
        original: "Ally",
    },
    "Beta": {
        nickname: "Jester",
        original: "Enemy"
    }
}
function getPlayerNickname(id) {
    
    return id.nickname;
}

const dummylobbyState = {
    "id": "",
    "players": [
        "DummyID",
        "Lorem",
        "Ipsum"


    ],
    "remaining_players": ["Lorem", "Snorlax"],
    "invited": [],
    "host": "",
    "code": "",
    "events": [],

    "event_history": [],
    "current_event": EventGenMap("BackroomDeal", lobbyPlayers.DummyID, getPlayerArray())
}
