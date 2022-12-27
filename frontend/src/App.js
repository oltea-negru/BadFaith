import Settings from "./pages/Settings";
import ReduxExample from "./pages/reduxExample";
import Second from "./pages/Second";
import PLogin from "./pages/LoginRoom/PlayerLogin.js"
import
{
	BrowserRouter as Router,
	Route,
	Routes,

} from "react-router-dom";

import WaitingRoom from "./pages/WaitingRoom.js";
import LoginRoom from "./pages/LoginRoom/LoginRoom.js";
// import PlayerLogin from "./pages"


function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/reduxExample" element={<ReduxExample />} />
				<Route path="/" element={<LoginRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/playerLogin" element={<PLogin/>}/>
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
