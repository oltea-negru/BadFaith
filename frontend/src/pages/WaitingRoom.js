import { useDispatch, useSelector } from "react-redux";
import WaitingList from "../assets/svg/WaitingBoardComponent.svg";
import PlayerWaiting from "../components/player_waiting";
import { readyUp } from "../redux/middleware/gameServerMiddleware";
import Chat from "./ChatTest";

export default function WaitingRoom() {
    const { player, lobbyCode, lobby } = useSelector(state => state.game)
    const dispatch = useDispatch()
    const colors = ['#813b45', '#7f6a8b', '#6f98aa', '#FF8042', '#7c6434', '#e3bd73', '#5a2b32', '#8c9c83'];

    function readPlayers()
    {
        const players = []
        if (lobby) {
            // console.log(lobby.players)
            for (const key in lobby.players) {
                players.push(lobby.players[key])
            }
        } else
        {

            for (const key in lobby.players)
            {
                players.push(lobby.players[key])
            }
        }
        // console.log(players)
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
    // console.log(readPlayers(lobby.players))

    return (
        <div className="bg-waiting_lobby bg-cover h-screen">
            <div className="absolute left-2 top-2 w-fit bg-[#384d36] py-2 px-6 rounded-md">
                <strong className="font-another text-white font-thin text-3xl">
                    CODE: {lobbyCode}
                </strong>
            </div>
            <Chat />
            <div className="bottom-0 left-14 h-5/6 absolute">
                <img src={WaitingList} alt="waiting list" className="h-full" />
                <div className="absolute top-[12%] h-[45%] w-full text-center flex-col flex justify-between ">
                    {readPlayers().map((player) => <p className="text-white font-another text-2xl "> {player.nickname}</p>)}
                </div>
            </div>

            {player.isReady ?
                <button className="absolute font-another text-white hover:cursor-pointer focus:outline-none active:px-10 left-2 duration-500 ease-in-out top-16 w-fit bg-[#5183b3] py-2 px-6 rounded-md"
                    onClick={() => { dispatch(readyUp(lobbyCode)) }}>I am ready</button>
                : <button className="absolute font-another text-white hover:cursor-pointer left-2 focus:outline-none active:px-10 duration-500 ease-in-out top-16 w-fit bg-[#96363094] py-2 px-6 rounded-md"
                    onClick={() => { dispatch(readyUp(lobbyCode)) }}>Are you ready?</button>
            }
            <div className="flex flex-row ml-[30%] mt-[20%] absolute">
                {readPlayers().map((player, index) => <PlayerWaiting text={player.nickname} color={colors[index]} index={index + 1} />)}
            </div>

            <button className="absolute bottom-2 left-[48%] w-fit py-2 px-4 text-white font-another bg-[#96363094] rounded-md hover:cursor-pointer focus:outline-none active:px-16 duration-500 ease-in-out" onClick={() => { }}>Leave Game</button>

        </div>

    );
}

// const dummyPlayers = [
//     {
//         "nickname": "aaryan",
//     },
//     {
//         "nickname": "oltea",
//     },
//     {
//         "nickname": "nee",
//     },
//     {
//         "nickname": "gavin",
//     },
//     {
//         "nickname": "adithya",
//     },
//     {
//         "nickname": "thanuj",
//     },
//     {
//         "nickname": "cameron",
//     },

// ]