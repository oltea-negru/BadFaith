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
import EntryPage from "./pages/EntryPage/EntryPage";


function App() {
  return (
   <Router>
				<Routes>
					<Route path="/" element={<EntryPage/>}/>
					<Route path="/waitingRoom" element={<WaitingRoom/>}/>
					<Route path="/second" element={<Second/>}/>
				</Routes>
		</Router>
  );
}

export default App;
