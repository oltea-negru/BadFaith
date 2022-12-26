
export default function ChatMessage({ message }) {
    return (
        <div className="chat-row">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


