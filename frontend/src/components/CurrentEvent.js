import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg"
import { useSelector } from "react-redux";
import { EventGenMap } from "../components/eventMap";

export function CurrentEvent() {
    const { lobby } = useSelector(state => state.game)
    
    const currEvent =  EventGenMap("Blackmailed", {
        nickname: "LoremIpsum",
        icon: "Figure this out",
        original: "Enemy",
        allegiance: "Enemy"
    }, getPlayerArray())

    console.log('Curr', currEvent)

    let event = EventMap(dummylobbyState);
    console.log('Event', event)
    return (
        <div className="">
            <img src={Evidence} alt="Evidence Board" className="absolute right-[20%] top-[5%] h-1/2" />
            {event}
        </div>
    );
}

export function EventWaiting() {
    const { lobby } = useSelector(state => state.game)
    return (
        <OutsideEvent />
    );
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
    "remainingPlayers": ["Lorem", "Snorlax"],
    "invited": [],
    "host": "",
    "code": "",
    "events": [],
    "state": 5,
    "eventHistory": [],
    "currentEvent": {}
}
function getPlayerArray()
{
    let playerArray = [];
    Object.keys(dummylobbyState.players).forEach(player =>
    {
        playerArray.push(dummylobbyState.players[player]);
    })
    console.log('Players', playerArray)
    return playerArray;
}

