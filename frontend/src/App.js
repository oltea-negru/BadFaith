import Settings from "./pages/Settings";
import PLogin from "./pages/Login.js"
import PRegister from "./pages/Register.js"
import Voting from "./pages/Voting.js";
import Chat from "./pages/ChatTest";
import Lobby from "./pages/Lobby";
import WaitingRoom from "./pages/WaitingRoom";
import Endgame from "./pages/Endgame";
import
{
	BrowserRouter as Router,
	Route,
	Routes,

} from "react-router-dom";

import LoginRoom from "./pages/Home.js";
// import PlayerLogin from "./pages"
import EventRoom from "./pages/EventRoom";


function App()
{
	return (
		<Router>
			<Routes>
				{/* <Route path="/reduxExample" element={<ReduxExample />} /> */}
				<Route path="/" element={<LoginRoom />} />
				<Route path="/waiting" element={<WaitingRoom />} />
				<Route path="/login" element={<PLogin />} />
				<Route path="/register" element={<PRegister />} />
				<Route path="/voting" element={<Voting />} />
				<Route path="/endgame" element={<Endgame />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/event" element={<EventRoom />} />
			</Routes>
		</Router>
	);
}

export default App;
