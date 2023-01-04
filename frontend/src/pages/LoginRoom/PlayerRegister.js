import React from 'react'
import { useState, useEffect, useRef } from "react";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux'
import { setRegister } from "../../redux/slices/userSlice";
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
  // const email = useRef();
  // const password = useRef();
  const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, nickname, email, password, avatar } = useSelector(state => state.user);
 
  const [nicknameInput, setNickname] = useState(nickname);
  const [showOptions, setShowOptions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarInput, setAvatarInput] = useState(AvatarPlaceholder);
  const [avatarNumber, setAvatarNumber] = useState(avatar);

  async function hanldeRegister() {
    console.log('Avatar Number: ' + avatarNumber);
    if(emailInput === '' || passwordInput === '') return 
    const message = await (player_Register(emailInput, passwordInput))
    console.log(message.msg)
    
    if(message.msg === 'OK') {
      console.log("User registered, Dispatching credentials")
      console.log('Current registered email: ' + emailInput);
      console.log('Current registered password: ' + passwordInput);
      console.log('Avatar Number: ' + avatarNumber);
      alert("Registered successfully!");
      dispatch(setRegister({email: emailInput, password: passwordInput, avatar: avatarInput} ))
      navigateToLobby();
    }else{
      alert(message.msg);
    }
    console.log("current User: " + email + " " + password + " " + avatarNumber)
  }

  const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7]
  .map(avatar => <img src={avatar}
      onClick={() => { setAvatarInput(avatar); setShowOptions(false) }}
      alt="Avatar"
      className="h-32 hover:transition ease-out duration-500  rounded-lg hover:h-44  hover:cursor-pointer" />)

  function navigateToLobby()
  {
    navigate("/lobby");
  }

  return showOptions ?
  <div className="relative grid place-items-center bg-waiting_lobby h-screen w-screen bg-bottom">
    <div className="h-1/3 w-full flex flex-row justify-around items-center bg-waiting_lobby bg-bottom border-[#7b6437] border-8">
        {avatars}
    </div>
  </div> :
    <div className='registerEmpty'>
      <form>
            <p><input type="text" id="email" name="email" placeholder="Email" style={styleInput} value={emailInput} onChange={event => setEmail(event.target.value)}/> </p>
            <p><input type="text" id="password" name="password" placeholder="Password (8-30 chars)" style={styleInput} value={passwordInput} onChange={event => setPassword(event.target.value)}/> </p>
      </form>
      <p><button className="outline" onClick={() => hanldeRegister({email: emailInput, password: passwordInput})}><EnterButton/></button></p>
 

    <div className="absolute flex-col text-white text-3xl font-another w-1/3 h-2/3 justify-between  mt-28 items-center flex ">
    <div>
        <img src={avatarInput} alt="Avatar" className="h-36 rounded-lg " />
        <div className="flex flex-row">
            <img src={EditAvatar} alt="Edit Avatar" onClick={() => setShowOptions(true)} className="w-10 avatarButton " />
            <img src={RemoveAvatar} alt="Remove Avatar" onClick={() => setAvatarInput(AvatarPlaceholder)} className="avatarButton" />
        </div>
    </div>
    </div>
    </div>
  
}