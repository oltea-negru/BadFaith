import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetails, incrementWin, incrementGame } from "../redux/slices/userSlice";
import {useState} from 'react';


function ReduxExample()
{
  const dispatch = useDispatch()

  const { stats, nickname, email } = useSelector(state => state.user)


  const [nicknameInput, setNickname] = useState('')
  const [emailInput, setEmail] = useState('')

  const navigate = useNavigate();
  
  return (
    <div className="grid h-screen place-items-center bg-red-600">
      <label for="nickname">Nickname:</label>
      <input type="text" id="nickname" name="nickname" value={nicknameInput} onChange={event => {
        setNickname(event.target.value)
        console.log(event.target.value)
      }}/> 
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" value={emailInput} onChange={event => setEmail(event.target.value)}/> 
      <button className="outline" onClick={() => dispatch(setUserDetails({ nickname: nicknameInput, email: emailInput }))}>Submit</button>
      <button className="outline" onClick={() => navigate("/settings")}>Go to second page</button>
      <h1>Submitted Details</h1>
      <p>Nickname in state: {nickname}</p>
      <p>Email in state: {email}</p>
      <p>Wins in state: {stats.wins}</p> <button className="outline" onClick={() => dispatch(incrementWin())}>Increment wins in redux (Notice total games too!)</button>
      <p>Total games in state: {stats.totalGames}</p> <button className="outline" onClick={() => dispatch(incrementGame())}>Increment total games in redux</button>
    </div>
  );
}

export default ReduxExample;
