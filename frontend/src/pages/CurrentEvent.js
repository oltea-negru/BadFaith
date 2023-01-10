import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import EventMap, { OutsideEvent } from "../components/eventMap";
import profilepic from "../assets/images/PlacholderIcon.png";
import { EventGenMap } from "../components/eventMap";



export default function CurrentEvent({current_event}) {
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





function getPlayerNickname(id) {

    return id.nickname;
}
