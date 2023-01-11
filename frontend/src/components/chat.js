
export default function ChatMessage({ message })
{
    return (
        <div className="font-another bg-[#e3bd73] rounded-md m-2 w-fit p-1">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


