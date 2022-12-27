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


function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/reduxExample" element={<ReduxExample />} />
				<Route path="/" element={<WaitingRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</Router>
	);
>>>>>>> main
}

export default App;
