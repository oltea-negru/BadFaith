import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './components/CurrentEvent.css';
export default function CurrentEvent()
{
    const lobby = useState([]);

    return (
        <div className="event">
            <div className="event_name">
                <strong>{dummylobbyState.current_event.name}</strong>
            </div>
            <div className="event_flavour">
                <p>{dummylobbyState.current_event.blind_info}</p>
            </div>
            <div className="player_name">
                <strong>{getPlayerNickname(dummylobbyState.current_event.player)}</strong>
            </div>
            
        </div>
    );
}

function getPlayerNickname(id) {
    const player = lobbyPlayers[id];
    return player.nickname;
}

var lobbyPlayers = {
    "DummyID": {
        "nickname" : "LoremIpsum",
        "icon" :"Figure this out",
    },
    "Lorem": {
        "nickname": "Sean Connery",
        "icon" :"Figure this out",
    },
    "Ipsum": {
        "nickname": "Travolta",
        "icon" : "Figure this out",
        "role" : "",
        "target": "",
    }
}
const dummylobbyState = {
        "id": "",
        "players": [
             "DummyID",
            "Lorem",
            "Ipsum"
            
            
        ],
        "remaining_players" : ["Lorem","Snorlax"],
        "invited": [],
        "host": "",
        "code": "",
        "events": [],
        
        "event_history": [],
        "current_event" : {
            "id" : "TBFO",
            "player" : "DummyID",
            "blind_info" : "This is placeholderText",
            "name" : "PlaceholderEvent",
            "details" : "this should only be seen by Enrico",
            "extra_players" : ["Lorem", "Ipsum"]
        }
    } 