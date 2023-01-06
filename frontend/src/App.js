import Settings from "./pages/Settings";
// import ReduxExample from "./pages/reduxExample";
import Second from "./pages/Second";
import PLogin from "./pages/LoginRoom/playerLogin.js"
import PRegister from "./pages/LoginRoom/PlayerRegister.js"
import Voting from "./pages/VotingRoom/Voting.js";

import Chat from "./pages/ChatTest";
import Lobby from "./pages/Lobby";
import
{
	BrowserRouter as Router,
	Route,
	Routes,

} from "react-router-dom";

import LoginRoom from "./pages/LoginRoom/LoginRoom.js";
// import PlayerLogin from "./pages"
import EventRoom from "./pages/EventRoom";


function App()
{
	return (
		<Router>
			<Routes>
				{/* <Route path="/reduxExample" element={<ReduxExample />} /> */}
				<Route path="/" element={<LoginRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/playerLogin" element={<PLogin />} />
				<Route path="/playerRegister" element={<PRegister />} />
				<Route path="/voting" element={<Voting />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/settings" element={<Settings
					avatar="frontend/src/assets/images/main.jpg"
					nickname="aaryan"
					email="arryan@mamba.com"
					firends={[]}
					stats={[]}
					id="id" />} />
				<Route path="/event" element={<EventRoom />} />
			</Routes>
		</Router>

		//    <Router>
		// 				<Routes>
		// 					<Route path="/" element={<WaitingRoom/>} />
		// 					<Route path="/second" element={<Second/>} />
		// 				</Routes>
		// 		</Router>
	);
}

export default App;
