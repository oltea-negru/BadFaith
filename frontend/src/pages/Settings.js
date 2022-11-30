export default function Settings(props)
{
    return (<div className="grid place-items-center bg-orange-900 w-full h-screen">
        <button className="absolute top-0 right-0 mt-5 mr-5 hover:bg-orange-400 outline bg-orange-800 text-white w-12 h-10">Edit</button>
        <div className="grid place-items-center bg-orange-400 w-[80%] h-[70%]">

            <img src={props.avatar} alt="player avatar" />
            <p className="font-bloomberg text-2xl">{props.nickname}</p>
            <p>{props.stats}</p>
            <p>{props.friends}</p>
        </div>

    </div>);
}