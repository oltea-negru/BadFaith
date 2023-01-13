import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg";
import { useDispatch, useSelector } from "react-redux";
import { EventGenMap } from "../components/eventMap";
import { useEffect } from "react";
import { updateLobby } from "../redux/slices/gameSlice";

export function CurrentEvent()
{
    const { lobby } = useSelector((state) => state.game);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        const dummylobbyState = {
            inEvent: inEvent,
            id: "",
            players: {
                DummyID: {
                    nickname: "LoremIpsum",
                    icon: "Figure this out",
                    original: "Enemy",
                    allegiance: "Enemy",
                },
                Lorem: {
                    nickname: "Sean Connery",
                    icon: "Figure this out",
                    original: "Enemy",
                    allegiance: "Ally",
                },
                Ipsum: {
                    nickname: "Travolta",
                    icon: "Figure this out",
                    original: "Ally",
                    allegiance: "Enemy",
                    target: "",
                },
                Delta: {
                    nickname: "Geronimo",
                    original: "Ally",
                    allegiance: "Ally",
                },
                Beta: {
                    nickname: "Jester",
                    original: "Enemy",
                    allegiance: "Enemy",
                },
            },
            remainingPlayers: ["Lorem", "Snorlax"],
            invited: [],
            host: "",
            code: "",
            events: [],
            state: 5,
            eventHistory: [],
            currentEvent: {},
        };
        function getPlayerArray()
        {
            let playerArray = [];
            Object.keys(dummylobbyState.players).forEach((player) =>
            {
                playerArray.push(dummylobbyState.players[player]);
            });
            console.log("Players", playerArray);
            return playerArray;
        }
        const currEvent = EventGenMap(
            "BlackMark",
            {
                nickname: "LoremIpsum",
                icon: "Figure this out",
                original: "Enemy",
                allegiance: "Enemy",
            },
            getPlayerArray()
        );
        dummylobbyState.currentEvent = currEvent;
        // console.log('Curr', currEvent)
        console.log(dummylobbyState.currentEvent.blind_info);
        dispatch(updateLobby(dummylobbyState));
    }, []);

    let event = EventMap();
    console.log("Event", event);
    return (
        <>
            <div className="absolute top-2 left-2 w-fit bg-[#856831] py-2 px-6 rounded-md">
                <strong className="font-another text-white font-thin text-xl">
                    Player: *insert username here*
                </strong>
            </div>
            <div className="right-[20%] top-0 h-1/2 absolute min-h-[400px] max-h-[650px] max-w-[600px] min-w-[560px] ">
                <img src={Evidence} alt="Evidence Board" className="h-full" />
                {event}
            </div>
        </>
    );
}

export function EventWaiting()
{
    const { lobby } = useSelector((state) => state.game);
    return <>
        <div className="absolute top-2 left-2 w-fit bg-[#856831] py-2 px-6 rounded-md">
            <strong className="font-another text-white font-thin text-xl">
                Player: *insert username here*
            </strong>
        </div>
        <OutsideEvent />;
    </>
}

const inEvent = true;
