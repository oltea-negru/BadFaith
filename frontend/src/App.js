import Settings from "./pages/Settings";
import ReduxExample from "./pages/reduxExample";
import Second from "./pages/Second";
import PreviewTest from "./pages/PreviewTest";
import Player from "./models/Player";

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
				<Route path="/preview" element={<PreviewTest />} />
				<Route path="/" element={<WaitingRoom />} />
				<Route path="/second" element={<Second />} />
				<Route path="/settings" element={<Settings
					avatar="frontend/src/assets/images/main.jpg"
					nickname="aaryan"
					email="arryan@mamba.com"
					firends={[]}
					stats={[]}
					id="id" />} />
			</Routes>
		</Router>
	);
}

export default App;
