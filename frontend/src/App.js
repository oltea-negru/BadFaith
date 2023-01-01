import Settings from "./pages/Settings";
import ReduxExample from "./pages/reduxExample";
import Second from "./pages/Second";
import Chat from "./pages/ChatTest";
import
{
	BrowserRouter as Router,
	Route,
	Routes,

} from "react-router-dom";
import WaitingRoom from "./pages/WaitingRoom.js";
import EventRoom from "./pages/EventRoom";


function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/reduxExample" element={<ReduxExample />} />
				<Route path="/" element={<WaitingRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/chat" element={<Chat />} />
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
	);
}

export default App;
