import Voting from "./Voting.js";
import WaitingRoom from "./WaitingRoom";
import EventRoom from "./EventRoom";
import { EventGenMap } from "../components/eventMap";
export default function Game({ lobby_state }) {
    var used_state = lobby_state
    if (used_state == null) used_state = dummylobbyState
    dummylobbyState.current_event = EventGenMap("GagOrder", {
        nickname: "LoremIpsum",
        icon: "Figure this out",
        original: "Enemy",
        allegiance: "Enemy"
    }, getPlayerArray())

   return (
    <div>
        {setFunction(used_state)}
    </div>
   )
}

const setFunction = (used_state) =>  {
    switch (used_state.state) {
        case 1:// Joining
            return (<WaitingRoom />)
        case 2:// Starting
            return (<WaitingRoom />)
        case 3:// Between Events
            return (<WaitingRoom />)
        case 4:// Events
            return (<EventRoom lobby_state={used_state} />)
        case 5:// Discussion
            return (<WaitingRoom />)
        case 6:// Voting
            return (<Voting />)
        case 7:// Results
            break;
    }
    return
}



const inEvent = true
const dummylobbyState = {
    "inEvent": inEvent,
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
    "state": 6,
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