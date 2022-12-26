
export default function ChatMessage({ message }) {
    return (
        <div class="chat-row">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


