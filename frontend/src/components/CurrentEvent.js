import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg"
import { useSelector } from "react-redux";

export function CurrentEvent() {
    const { lobby } = useSelector(state => state.game)

    let event = EventMap(lobby.currentEvent);
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
        <OutsideEvent event_data={lobby.currentEvent} />
    );
}