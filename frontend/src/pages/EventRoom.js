import { CurrentEvent, EventWaiting } from "../components/CurrentEvent";
import { useSelector } from "react-redux";

export default function EventRoom() {
    const { lobby, player } = useSelector(state => state.game);

    // if (lobby.state == 5) {
    //     if (lobby.currentEvent.player.socketID == player.socketID) {
    //         console.log('InEvent')
            return (
                <div className=" bg-event_room h-screen bg-cover bg-bottom">
                    <CurrentEvent />
                </div>
            )
        // } else {
        //     console.log('OutEvent')
        //     return (
        //         <div>
        //             <EventWaiting />
        //         </div>

        //     )
        // }
    // }
}

