import { useSelector } from "react-redux";
import { CurrentEvent, EventWaiting } from "../components/CurrentEvent";

export default function EventRoom() {
    const { player, lobby } = useSelector(state => state.game)
        if (lobby.currentEvent != null && player.socketID === lobby.currentEvent.player.socketID) {
            return (
                <div className="bg-event_room h-screen bg-cover bg-bottom">
                    <CurrentEvent />
                </div>
            )
        } else {
            return (
                <div className="bg-event_waiting h-screen bg-cover bg-bottom">
                    <EventWaiting />
                </div>
            )
        }
}

