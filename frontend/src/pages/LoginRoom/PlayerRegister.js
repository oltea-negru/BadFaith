import React from 'react'
import { useState, useEffect, useRef } from "react";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux'
import { setCredentials } from "../../redux/slices/userSlice";
import { player_Register } from "../../api/examplePlayerMethods.js";
import AvatarPlaceholder from "../../assets/avatars/placeholder.svg";
import Avatar1 from "../../assets/avatars/avatar-1.svg";
import Avatar2 from "../../assets/avatars/avatar-2.svg";
import Avatar3 from "../../assets/avatars/avatar-3.svg";
import Avatar4 from "../../assets/avatars/avatar-4.svg";
import Avatar5 from "../../assets/avatars/avatar-5.svg";
import Avatar6 from "../../assets/avatars/avatar-6.svg";
import Avatar7 from "../../assets/avatars/avatar-7.svg";
import EditAvatar from "../../assets/svg/edit.svg";
import RemoveAvatar from "../../assets/svg/bin.svg";
import SeePassword from "../../assets/svg/eye-opened.svg";
import HidePassword from "../../assets/svg/eye-closed.svg";

export default function PlayerRegister() {
  const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, nickname, email, password, avatar } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);

  async function hanldeRegister() {
    if(emailInput === '' || passwordInput === '') return 
    const message = await (player_Register(emailInput, passwordInput))
    console.log(message.msg)
    
    if(message.msg === 'OK') {
      console.log("User registered, Dispatching credentials")
      console.log('Current registered email: ' + emailInput);
      console.log('Current registered password: ' + passwordInput);
      alert("Registered successfully!");
      dispatch(setCredentials({email: emailInput, password: passwordInput} ))
      navigateToLobby();
    }else{
      alert(message.msg);
    }
    console.log("current User: " + email + " " + password )
  }

  function navigateToLobby()
  {
    navigate("/lobby");
  }

  return (
    <>
    <div className='registerEmpty'>
      <form>
            <p><input type="text" id="email" name="email" placeholder="Email" style={styleInput} value={emailInput} onChange={event => setEmail(event.target.value)}/> </p>
            <p><input type="text" id="password" name="password" placeholder="Password (8-30 chars)" style={styleInput} value={passwordInput} onChange={event => setPassword(event.target.value)}/> </p>
      </form>
      <p><button className="outline" onClick={() => hanldeRegister({email: emailInput, password: passwordInput})}><EnterButton/></button></p>
    </div>
    </>
  )
  
}