import React from "react";

export default function SampleEvent({extraPlayers}) {
    return (
        <div className="eventDetails">
            <strong>{extraPlayers[0]} is an old enemy of {extraPlayers[1]}.</strong>
            <strong>They would never knowingly work together.</strong>
        </div>
    );
}