import eventRoom from "../assets/svg/EventRoom.svg";
import CurrentEvent from "./CurrentEvent";

export default function EventRoom() {
    return (
        <div className="bg-event_room h-screen w-screen bg-cover">
            <CurrentEvent />
        </div>
    )
}