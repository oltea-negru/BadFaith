import { useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react';
import { login_remove } from "./api/examplePlayerMethods.js";
import Settings from "./pages/Settings";
import PLogin from "./pages/Login.js"
import PRegister from "./pages/Register.js"
import Voting from "./pages/Voting.js";
import Chat from "./pages/ChatTest";
import Lobby from "./pages/Lobby";
import WaitingRoom from "./pages/WaitingRoom";
import LoginRoom from "./pages/Home.js";
import Game from "./pages/Game";
import Endgame from "./pages/Endgame";
import
{
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import { gsConnect } from './redux/middleware/gameServerMiddleware.js';


function App()
{
	const dispatch = useDispatch()
	const { email, password, error } = useSelector(state => state.user)

	useEffect (() => {
		dispatch(gsConnect())
	}, []);

	useEffect(() => {
		if(error){
			alert(error)
		}
	}, [error])


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
				<Route path="/game" element={<Game />} />
			</Routes>
		</Router>
	);
}

export default App;
