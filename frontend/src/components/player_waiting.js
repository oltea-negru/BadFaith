export default function PlayerWaiting(props)
{
    return (
        <div >
            <div style={{ "animation-duration": 0.2 * props.index + "s" }} class="logo">
                <div style={{ "background-color": props.color }} className="text-white p-2 rounded-md text-4xl ml-3 font-another">{props.text}</div>
            </div>
        </div>
    );
}
