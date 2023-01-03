import React from 'react'
import { useState, useEffect, useRef } from "react";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setUserDetails, setCredentials } from "../../redux/slices/userSlice";
import { player_Register } from "../../api/examplePlayerMethods.js";

export default function PlayerRegister() {
  // const email = useRef();
  // const password = useRef();
  const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}

  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const dispatch = useDispatch()


  async function hanldeRegister() {
    if(emailInput === '' || passwordInput === '') return 
    console.log('Registering email: ' + emailInput);
    console.log('Registering password: ' + passwordInput);
    const message = await (player_Register(emailInput, passwordInput))
    console.log(message)
  }
  return (
    <>
    <div className='registerEmpty'>
      <form>
            <p><input type="text" id="email" name="email" placeholder="Email" style={styleInput} value={emailInput} onChange={event => setEmail(event.target.value)}/> </p>
            <p><input type="text" id="password" name="password" placeholder="Password" style={styleInput} value={passwordInput} onChange={event => setPassword(event.target.value)}/> </p>
      </form>
      <p><button className="outline" onClick={() => hanldeRegister({email: emailInput, password: passwordInput})}><EnterButton/></button></p>
    </div>
    </>
  )
}