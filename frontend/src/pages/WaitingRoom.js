import { useDispatch, useSelector } from "react-redux";
import WaitingList from "../assets/svg/WaitingBoardComponent.svg";
import PlayerWaiting from "../components/player_waiting";
import { readyUp } from "../redux/middleware/gameServerMiddleware";
import Chat from "./ChatTest";

export default function WaitingRoom()
{
    const { lobbyCode, lobby } = useSelector(state => state.game)
    const dispatch = useDispatch()
    const colors = ['#813b45', '#7f6a8b', '#6f98aa', '#FF8042', '#7c6434', '#e3bd73', '#5a2b32', '#8c9c83'];

    function readPlayers() {
        const players = []
        for(const key in lobby.players ) {
            players.push(lobby.players[key])
        }
        return players
    }
    // async function getPlayers()
    // {
    //     var i = 0;
    //     while (i < 3)
    //     {
    //         setPlayers(...players, dummyPlayers[i]);
    //         setTimeout(() =>
    //         {
    //             console.log("jo");
    //         }, 500);
    //         i++;
    //     }
    // }

    // useEffect(() =>
    // {
    //     getPlayers();
    //     console.log(players.length);
    // }, []);
    console.log(readPlayers(lobby.players))

    return (
        <div className="bg-waiting_lobby bg-cover h-screen">
            <div className="absoulte top-[5%] right-[20%]">
                <strong className="font-another text-[#ff0000] text-2xl">{lobbyCode}</strong>
            </div>
            <Chat />
            <div className="bottom-0 left-14 h-5/6 absolute">
                <img src={WaitingList} alt="waiting list" className="h-full" />
                <div className="absolute top-[15%] h-[45%] left-1/3 ">
                    {readPlayers().map((player) => <p className="text-white font-another text-3xl "> {player.nickname}</p>)}
                </div>
            </div>
            <div>
                <button className="absolute bottom-[15%] right-[45%] font-another text-2xl rounded-2xl"
                onClick={dispatch(readyUp(lobbyCode))}></button>
            </div>
            <div className="flex flex-row ml-[30%] mt-[20%] absolute">
                {readPlayers().map((player, index) => <PlayerWaiting text={player.nickname} color={colors[index]} index={index + 1} />)}
            </div>

        </div>

    );
}

const dummyPlayers = [
    {
        "nickname": "aaryan",
    },
    {
        "nickname": "oltea",
    },
    {
        "nickname": "nee",
    },
    {
        "nickname": "gavin",
    },
    {
        "nickname": "adithya",
    },
    {
        "nickname": "thanuj",
    },
    {
        "nickname": "cameron",
    },

]