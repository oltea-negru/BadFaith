import EventMap, { OutsideEvent } from "./eventMap";
import Evidence from "../assets/svg/EvidenceBoard.svg"

export function CurrentEvent({ current_event })
{
    // const lobby = useState([]);

    let event = EventMap(current_event);
    return (
        <div className="">
            <img src={Evidence} alt="Evidence Board" className="absolute right-[20%] top-[5%] h-1/2" />
            {event}
        </div>
    );
}

export function EventWaiting({ current_event })
{
    return (
        <OutsideEvent event_data={current_event} />
    );
}