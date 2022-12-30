import WaitingList from "../assets/svg/WaitingBoardComponent.svg";
import PlayerWaiting from "../components/player_waiting";
import Chat from "./ChatTest";

export default function WaitingRoom()
{

    const colors = ['#813b45', '#7f6a8b', '#6f98aa', '#FF8042', '#7c6434', '#e3bd73', '#5a2b32', '#8c9c83'];

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

    return (
        <div className="bg-waiting_lobby bg-cover h-screen w-screen">
            <div className="bottom-0 left-14 h-5/6 absolute">
                <img src={WaitingList} alt="sdas" className="h-full" />
                <div className="absolute top-[15%] h-[45%] left-1/3 ">
                    {dummyPlayers.map((player) => <p className="text-white font-another text-3xl "> {player.nickname}</p>)}
                </div>
                <Chat/>
            </div>
            <div className="flex flex-row ml-[30%] mt-[20%] absolute">
                {dummyPlayers.map((player, index) => <PlayerWaiting text={player.nickname} color={colors[index]} index={index + 1} />)}
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