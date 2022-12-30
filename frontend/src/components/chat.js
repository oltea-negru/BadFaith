
export default function ChatMessage({ message }) {
    return (
        <div className="chat-row font-another">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


