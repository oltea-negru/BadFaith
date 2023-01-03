import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { ReactComponent as LoginEmpty } from "../../svgsfolder/LoginEmpty.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setUserDetails, setCredentials } from "../../redux/slices/userSlice";
import { player_Login } from "../../api/examplePlayerMethods.js";

export default function PlayerLogin() {
    //const email = useRef();
    const pwd = useRef();
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}

    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');
    const dispatch = useDispatch()
    
    const { email, password } = useSelector(state => state.user)

    async function handleLogin() {
        if(emailInput === '' || passwordInput === '') return 
        console.log('provided email: ' + emailInput);
        console.log('provided password: ' + passwordInput);
        const message = await (player_Login(emailInput, passwordInput))
        console.log(message.msg)
        if(message.msg === 'OK') {
            console.log("User LogedIn, Dispatching credentials")
            dispatch(setCredentials({email: emailInput, password: passwordInput}))
        }
        console.log("current User: " + email + " " + password)
    }
  return (
    <> 
    <div className="loginEmpty">
        <form>
            <p>
                <input type="text" id="email" name="email" placeholder="Email" style={styleInput} value={emailInput} onChange={event => setEmail(event.target.value)}/> 
            </p>
            <p>
                <input type="text" id="password" name="password" placeholder="Password" style={styleInput} value={passwordInput} onChange={event => setPassword(event.target.value)}/> 
            </p>
        </form>
            <p>
                <button className="outline" onClick={() => handleLogin({email: emailInput, password: passwordInput})}><EnterButton/></button>
            </p>
            {/* Need to navigate to lobby here */}
            {/* <button className="outline" onClick={() => navigate("/settings")}>Go to second page</button> */}
    </div>
    </>
    )
}


