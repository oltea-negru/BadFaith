export default function PlayerWaiting(props)
{
    return (
        <div >
            <div style={{ "animation-duration": 0.2 * props.index + "s" }} class="logo">
                <div style={{ "background-color": props.color }} className="text-white text-4xl ml-6 font-another">{props.text}</div>
            </div>
        </div>
    );
}
