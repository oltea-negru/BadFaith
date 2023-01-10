import eventRoom from "../assets/svg/EventRoom.svg";
import CurrentEvent, { EventWaiting } from "./CurrentEvent";

export default function EventRoom() {
    if (inEvent) {
        return (
            <div className="bg-event_room h-screen w-screen bg-cover">
                <CurrentEvent />
            </div>
        )
    } else {
        return (
            <div className="bg-event_waiting h-screen w-screen bg-cover">
                <EventWaiting />
            </div>
        )
    }
}

const inEvent = true