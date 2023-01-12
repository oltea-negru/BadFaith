import Voting from "./Voting.js";
import WaitingRoom from "./WaitingRoom";
import EventRoom from "./EventRoom";
import SeeEnemies from "./SeeEnemies.js";
import { EventGenMap } from "../components/eventMap";
import { useSelector } from 'react-redux'
import Endgame from "./Endgame.js";
export default function Game({ lobby_state })
{

    const { lobby } = useSelector(state => state.game);
    // if (used_state == null) 
    used_state = dummylobbyState
    dummylobbyState.current_event = EventGenMap("BodyGuard", {
        nickname: "LoremIpsum",
        icon: "Figure this out",
        original: "Enemy",
        allegiance: "Enemy"
    }, getPlayerArray())

    const setFunction = (used_state) =>
    {
        switch (used_state.state)
        {
            case 1:// Joining
                return (<WaitingRoom />)
            case 2:// Starting
                return (<WaitingRoom />)
            case 3:// See enemies
                return (<SeeEnemies lobby_state={used_state} />)
            case 4:// Between Events
                return (<WaitingRoom lobby_state={used_state} />)
            case 5:// Events
                return (<EventRoom lobby_state={used_state} />)
            case 6:// Discussion
                return (<WaitingRoom />)
            case 7:// Voting
                return (<Voting />)
            case 8:// Results
                return (<Endgame />)
        }
    }

    return (
        <div>
            {setFunction(used_state)}
        </div>
    )
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
    "state": 3,
    "event_history": [],
    "current_event": {}
}
function getPlayerArray()
{
    let playerArray = [];
    Object.keys(dummylobbyState.players).forEach(player =>
    {
        playerArray.push(dummylobbyState.players[player]);
    })
    return playerArray;
}