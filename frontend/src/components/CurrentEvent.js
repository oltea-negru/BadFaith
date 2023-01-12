import EventMap, { OutsideEvent } from "./eventMap";

export function CurrentEvent({ current_event })
{
    // const lobby = useState([]);
    return (
        <div >
            {EventMap(current_event)}
        </div>
    );
}

export function EventWaiting({ current_event })
{
    return (
        <OutsideEvent event_data={current_event} />
    );
}