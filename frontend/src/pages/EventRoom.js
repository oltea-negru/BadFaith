import { EventGenMap } from "../components/eventMap";
import { CurrentEvent, EventWaiting } from "../components/CurrentEvent";
import { useSelector } from "react-redux";

export default function EventRoom()
{
    const{lobby,player} = useSelector(state => state.game);


    if (lobby.state == 5)
    {
        if (lobby.currentEvent.player.socketID == player.socketID)
        {
            return (
                <div className=" bg-event_room h-screen bg-cover bg-bottom">
                    <CurrentEvent />
                </div>
            )
        } else
        {
            return (
                <EventWaiting />
            )
        }
    }
}
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
    "state": 4,
    "event_history": [],
    "currentEvent": {}
}
function getPlayerArray()
{
    let playerArray = new Array();
    Object.keys(dummylobbyState.players).forEach(player =>
    {
        playerArray.push(dummylobbyState.players[player]);
    })
    return playerArray;
}