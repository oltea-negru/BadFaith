import React from "react";


function SampleEvent({event_data}) {
    return (
        <div class="eventDetails">
            <strong>{event_data.details}</strong><br/>
            <strong>{event_data.extra_players[0]} is an old enemy of {event_data.extra_players[1]}.</strong>
            <br></br>
            <strong>They would never knowingly work together.</strong>
        </div>
    );
}

export default function EventMap(current_event)
{
    const key = current_event.event_function;
  switch(key)
  {
    case "SampleEvent":
        return <SampleEvent event_data={current_event} />;
    default:
        break;

  }
  
}
