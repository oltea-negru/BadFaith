import { useDispatch, useSelector } from "react-redux";
import WaitingList from "../assets/svg/EventBoardComponent.svg";
import PlayerWaiting from "../components/player_waiting";
import { readyUp } from "../redux/middleware/gameServerMiddleware";

export default function SeeEnemies({ lobby_state }) {
    const { lobbyCode, lobby, player } = useSelector(state => state.game)
    const dispatch = useDispatch()
    const colors = ['#813b45', '#7f6a8b', '#6f98aa', '#FF8042', '#7c6434', '#e3bd73', '#5a2b32', '#8c9c83'];

    function enemies() {
        const players = []
        //REDUX
        console.log('REDUX')
        if (player.allegiance == "Ally") {
            players.push({ nickname: "No Peeking!" })
        }
        else {
            for (const key in lobby.players) {
                if (lobby.players[key].allegiance == "Enemy") players.push(lobby.players[key])
            }
        }
        return players
    }
    console.log('Enemies', enemies())

    return (
        <div className="bg-waiting_lobby bg-cover h-screen">
            <div className="absoulte top-[5%] right-[20%]">
                <strong className="font-another text-[#ff0000] text-2xl">{lobbyCode}</strong>
            </div>
            <div className="bottom-0 left-[40%] h-5/6 absolute">
                <img src={WaitingList} alt="waiting list" className="h-full" />
                <div className="absolute top-[10%] left-1/3">
                    <strong className="font-another text-white text-5xl underline">Enemies:</strong>
                </div>
                <div className="absolute top-[15%] h-[45%] left-1/3 ">
                    {enemies().map((player) => <p className="text-white font-another text-3xl "> {player.nickname}</p>)}
                </div>
            </div>
            <div>
                <button className="absolute top-[10%] right-[45%] font-another text-2xl p-1 rounded-2xl hover:text-[#ff0000] bg-white"
                    onClick={() => dispatch(readyUp(lobbyCode))}>Ready</button>
            </div>
        </div>

    );
}