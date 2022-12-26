export default function UpdateChat(message) {
    let messages = new Array(); // needs to be moved outside
    /*
    message = {
        player: "",
        message: "",
    }
        */
    messages.push(message);
    return (
        <div>
            <div>
                <input type="text" v-model="chatmessage" class="form-control" placeholder="Chat" />
            </div>
            <ul id="chat">
                {messages.map((m) =>
                    <ChatMessage message={m}/>)}
            </ul>
        </div>

    );
}



function ChatMessage({ message }) {
    return (
        <div class="chat-row">
            <li>{message.player} : {message.message}</li>
        </div>
    );
}


