import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../components/CurrentEvent.css';
import EventMap from "../components/eventMap";
import profilepic from "../assets/images/PlacholderIcon.png";

 

export default function CurrentEvent()
{
    const lobby = useState([]);

    return (
        <div className="event">
            <div className="Blind-Info">
                <h4>Event:</h4>
                <strong>{dummylobbyState.current_event.name}</strong>
                <p>{dummylobbyState.current_event.blind_info}</p>
            </div>
            
            <div className="Player-Info">
                <strong>{getPlayerNickname(dummylobbyState.current_event.player)}</strong>
                <img className="Profile-Image" src={profilepic} alt="placeholder profile"/>
            </div>

            <div className="Event-Info">
                <div>
                    {EventMap(dummylobbyState.current_event)}
                </div>
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
        "extra_players" : ["Lorem", "Ipsum"],
        "event_function" : "OldAllies"
    }
}