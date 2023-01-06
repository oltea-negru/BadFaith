import React from 'react'
import { useState } from "react";
import EnterButton from "../assets/svg/Enter.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, } from 'react-redux'
import { setCredentials } from "../redux/slices/userSlice";
import { player_Register } from "../api/examplePlayerMethods.js";


export default function PlayerRegister()
{
  const styleInput = { backgroundColor: 'white', fontSize: '23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px' }

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, nickname, email, password, avatar } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);

  async function hanldeRegister()
  {
    if (emailInput === '' || passwordInput === '') return
    const message = await (player_Register(emailInput, passwordInput))
    console.log(message.msg)

    if (message.msg === 'OK')
    {
      console.log("User registered, Dispatching credentials")
      console.log('Current registered email: ' + emailInput);
      console.log('Current registered password: ' + passwordInput);
      alert("Registered successfully!");
      dispatch(setCredentials({ email: emailInput, password: passwordInput }))
      navigateToLobby();
    } else
    {
      alert(message.msg);
    }
    console.log("current User: " + email + " " + password)
  }

  function navigateToLobby()
  {
    navigate("/lobby");
  }

  function navigateToHome()
  {
    navigate("/");
  }

  return (
    <div className='bg-register bg-cover grid place-items-center h-screen'>
      <form className='flex flex-col justify-evenly h-1/3'>
        <input type="text" id="email" name="email" placeholder="Email" className='input' value={emailInput} onChange={event => setEmail(event.target.value)} />
        <input type="password" id="password" name="password" placeholder="Password (8-30 chars)" className='input' value={passwordInput} onChange={event => setPassword(event.target.value)} />
      </form>
      <img src={EnterButton} alt="Register Button" className="hover:cursor-pointer absolute right-[10%] top-[25%] hover:h-96" onClick={() => hanldeRegister({ email: emailInput, password: passwordInput })} />
      <button className='active:text-4xl hover:text-4xl focus:outline-none absolute bottom-20 left-20 text-3xl text-white' onClick={() => navigateToHome()}>Back</button>
    </div >
  )

}