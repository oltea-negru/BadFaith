import Settings from "./pages/Settings";
import PLogin from "./pages/Login.js"
import PRegister from "./pages/Register.js"
import Voting from "./pages/Voting.js";
import Chat from "./pages/ChatTest";
import Lobby from "./pages/Lobby";
import WaitingRoom from "./pages/WaitingRoom";
import LoginRoom from "./pages/Home.js";
import Game from "./pages/Game";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				{/* <Route path="/reduxExample" element={<ReduxExample />} /> */}
				<Route path="/" element={<LoginRoom />} />
				<Route path="/" element={<WaitingRoom />} />
				<Route path="/login" element={<PLogin />} />
				<Route path="/register" element={<PRegister />} />
				<Route path="/voting" element={<Voting />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/game" element={<Game />} />
			</Routes>
		</Router>
	);
}

export default App;
