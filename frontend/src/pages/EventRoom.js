import { EventGenMap } from "../components/eventMap";
import CurrentEvent, { EventWaiting } from "./CurrentEvent";

export default function EventRoom() {
    
    dummylobbyState.current_event = EventGenMap("Blackmailed", {
        nickname: "LoremIpsum",
        icon: "Figure this out",
        original: "Enemy",
        allegiance: "Enemy"
    }, getPlayerArray())

    if (inEvent) {
        return (
            <div className="bg-event_room h-screen w-screen bg-cover">
                <CurrentEvent current_event={dummylobbyState.current_event} />
            </div>
        )
    } else {
        return (
            <div className="bg-event_waiting h-screen w-screen bg-cover">
                <EventWaiting current_event={dummylobbyState.current_event} />
            </div>
        )
    }
}

const inEvent = true
const dummylobbyState = {
    "id": "",
    "players": {
        "DummyID": {
            nickname: "LoremIpsum",
            icon: "Figure this out",
            original: "Enemy",
            allegiance: "Enemy"
        },
        "Lorem": {
            nickname: "Sean Connery",
            icon: "Figure this out",
            original: "Enemy",
            allegiance: "Ally"
        },
        "Ipsum": {
            "nickname": "Travolta",
            "icon": "Figure this out",
            original: "Ally",
            allegiance: "Enemy",
            "target": "",
        },
        "Delta": {
            nickname: "Geronimo",
            original: "Ally",
            allegiance: "Ally"
        },
        "Beta": {
            nickname: "Jester",
            original: "Enemy",
            allegiance: "Enemy"
        }
    },
    "remaining_players": ["Lorem", "Snorlax"],
    "invited": [],
    "host": "",
    "code": "",
    "events": [],

    "event_history": [],
    "current_event": {}
}
function getPlayerArray() {
    let playerArray = new Array();
    Object.keys(dummylobbyState.players).forEach(player => {
        playerArray.push(dummylobbyState.players[player]);
    })
    return playerArray;
}