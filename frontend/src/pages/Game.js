import Voting from "./Voting.js";
import WaitingRoom from "./WaitingRoom";
import EventRoom from "./EventRoom";
import SeeEnemies from "./SeeEnemies.js";
import { useSelector } from 'react-redux'
import Endgame from "./Endgame.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Game({ lobby_state }) {

    const { lobby } = useSelector(state => state.game);
    const { email } = useSelector(state => state.user);
    // if (used_state == null) 
    // const used_state = dummylobbyState
    // dummylobbyState.current_event = EventGenMap("Blackmailed", {
    //     nickname: "LoremIpsum",
    //     icon: "Figure this out",
    //     original: "Enemy",
    //     allegiance: "Enemy"
    // }, getPlayerArray())

    const navigate = useNavigate()

    useEffect(() => {
        if(email=='')
            navigate('/')
    }, [email])

    const setFunction = (used_state) => {
        switch (used_state.state) {
            case 1:// Joining
                return (<WaitingRoom />)
            case 2:// Starting
                return (<WaitingRoom />)
            case 3:// See enemies
                return (<SeeEnemies />)
            case 4:// Between Events
                return (<WaitingRoom />)
            case 5:// Events
                return (<EventRoom />)
            case 6:// Discussion
                return (<WaitingRoom />)
            case 7:// Voting
                return (<Voting />)
            case 8:// Results
                return (<Endgame />)
            default:
                break;
        }
    }

    return (
        <div>
            {setFunction(lobby)}
        </div>
    )
}

