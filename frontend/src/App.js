import Settings from "./pages/Settings";
import ReduxExample from "./pages/reduxExample";
import Second from "./pages/Second";
import
{
	BrowserRouter as Router,
	Route,
	Routes,

} from "react-router-dom";
import WaitingRoom from "./pages/WaitingRoom.js";
import LoginRoom from "./pages/LoginRoom/LoginRoom.js";


function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/reduxExample" element={<ReduxExample />} />
				<Route path="/" element={<LoginRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/settings" element={<Settings />} />
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
