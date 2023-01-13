import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg";
import { useDispatch, useSelector } from "react-redux";
import EventHistory from "./EventHistory";
import { leaveRoom } from "../redux/middleware/gameServerMiddleware";

export function CurrentEvent() {
    const { playerID } = useSelector((state) => state.game);
    const dispatch = useDispatch()

    let event = EventMap();
    console.log("Event", event);
    return (
        <>
            <div className="right-[20%] top-0 h-1/2 absolute min-h-[400px] max-h-[650px] max-w-[600px] min-w-[560px] ">
                <img src={Evidence} alt="Evidence Board" className="h-full" />
                {event}
            </div>
            <button className="absolute bottom-2 left-[48%] w-fit py-2 px-4 z-50 text-white font-another bg-[#96363094] rounded-md hover:cursor-pointer focus:outline-none active:px-16 duration-500 ease-in-out" onClick={() => {dispatch(leaveRoom(playerID))}}>Leave Game</button>
        </>
    );
}

export function EventWaiting() {
    const { playerID } = useSelector((state) => state.game);
    const dispatch = useDispatch()
    return <>
        <EventHistory />
        <button className="absolute bottom-2 left-[48%] w-fit py-2 px-4 z-50 text-white font-another bg-[#96363094] rounded-md hover:cursor-pointer focus:outline-none active:px-16 duration-500 ease-in-out" onClick={() => {dispatch(leaveRoom(playerID))}}>Leave Game</button>
        <OutsideEvent />;
    </>
}

