import React from 'react'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EnterButton from "../svgsfolder/Enter.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setCredentials } from "../redux/slices/userSlice";
import { player_Login } from "../api/examplePlayerMethods.js";

export default function PlayerLogin()
{
    //const email = useRef();
    const pwd = useRef();
    const navigate = useNavigate();
    const styleInput = { backgroundColor: 'white', fontSize: '23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px' }

    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');
    const dispatch = useDispatch()

    const { email, password } = useSelector(state => state.user)

    async function handleLogin()
    {
        if (emailInput === '' || passwordInput === '') return
        console.log('provided email: ' + emailInput);
        console.log('provided password: ' + passwordInput);
        const message = await (player_Login(emailInput, passwordInput))
        console.log(message.msg)
        if (message.msg === 'OK')
        {
            console.log("User LogedIn, Dispatching credentials")
            dispatch(setCredentials({ email: emailInput, password: passwordInput }))
            alert("Logged In successfully!");
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
        <>
            <div className='bg-login bg-cover h-screen'>
                <form>
                    <p>
                        <input type="text" id="email" name="email" placeholder="Email" value={emailInput} onChange={event => setEmail(event.target.value)} />
                    </p>
                    <p>
                        <input type="text" id="password" name="password" placeholder="Password (8-30 chars)" value={passwordInput} onChange={event => setPassword(event.target.value)} />
                    </p>
                </form>
                <img src={EnterButton} alt="Register Button" className="hover:cursor-pointer absolute right-[10%] top-[25%] hover:h-96" onClick={() => handleLogin({ email: emailInput, password: passwordInput })} />
                <button className='active:text-4xl hover:text-4xl focus:outline-none absolute bottom-20 left-20 text-3xl text-white' onClick={() => navigateToHome()}>Back</button>
            </div>
        </>
    )
}


