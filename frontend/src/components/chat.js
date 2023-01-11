
export default function ChatMessage({ message })
{
    return (
        <div className="font-another bg-white rounded-lg mb-1 w-fit p-1">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


