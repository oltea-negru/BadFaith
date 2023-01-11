import EventMap, { OutsideEvent } from "./eventMap";

export function CurrentEvent({current_event}) {
    // const lobby = useState([]);
    return (
        <div>
            <div id="Event-Info">
                <div>
                    {EventMap(current_event)}
                </div>
            </div>

        </div>
    );
}

export function EventWaiting({current_event}) {
    return (
        <div>
            <OutsideEvent event_data={current_event} />
        </div>
    );
}