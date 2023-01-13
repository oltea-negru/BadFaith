import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg"
import { useDispatch, useSelector } from "react-redux";
import { EventGenMap } from "../components/eventMap";
import { useEffect } from "react";
import { updateLobby } from "../redux/slices/gameSlice";

export function CurrentEvent() {
    const { lobby } = useSelector(state => state.game)
    const dispatch = useDispatch()
    

    useEffect(() => {
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
        const currEvent =  EventGenMap("GagOrder", {
            nickname: "LoremIpsum",
            icon: "Figure this out",
            original: "Enemy",
            allegiance: "Enemy"
        }, getPlayerArray())
        dummylobbyState.currentEvent = currEvent
        // console.log('Curr', currEvent)
        console.log(dummylobbyState.currentEvent.blind_info)
        dispatch(updateLobby(dummylobbyState))
    }, [])


    let event = EventMap();
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

