import First from "./pages/First";
import Second from "./pages/Second";
import
{
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import WaitingRoom from "./pages/WaitingRoom/WaitingRoom.js";


function App() {
  return (
   <Router>
				<Routes>
					<Route path="/" element={<WaitingRoom/>} />
					<Route path="/second" element={<Second/>} />
				</Routes>
		</Router>
  );
}

export default App;
