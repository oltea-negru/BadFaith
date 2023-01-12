import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterButton from "../assets/svg/Enter.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setCredentials } from "../redux/slices/userSlice";
import { player_Login } from "../api/examplePlayerMethods.js";
import { login_status } from "../api/examplePlayerMethods.js";

export default function PlayerLogin()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');
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
            const status = await (login_status(emailInput, passwordInput))
            console.log(status.msg)
            if (status.msg === 'OK'){
                console.log("User LogedIn, Dispatching credentials")
                dispatch(setCredentials({ email: emailInput, password: passwordInput, avatar: message.avatarInt}))
                alert("Logged In successfully!");
                navigateToLobby();
            }
            else {
                alert("Login failed!" + status.msg);
            }
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
            <div className='bg-login bg-cover h-screen grid place-items-center'>
                <form className='flex flex-col justify-evenly h-1/3' >
                    <input type="text" id="email" name="email" placeholder="Email" className='input' value={emailInput} onChange={event => setEmail(event.target.value)} />
                    <input type="password" id="password" name="password" placeholder="Password (8-30 chars)" className='input' value={passwordInput} onChange={event => setPassword(event.target.value)} />
                </form>
                <div className='absolute right-0 bottom-0 overflow-hidden'>
                    <img src={EnterButton} alt="Register Button" className="hover:cursor-pointer h-[400px] translate-x-28 translate-y-28 hover:h-96" onClick={() => handleLogin({ email: emailInput, password: passwordInput })} />
                </div>
                <button className='active:text-4xl  overflow-hidden hover:text-4xl focus:outline-none absolute bottom-20 left-20 text-3xl text-white' onClick={() => navigateToHome()}>Back</button>
            </div>
        </>
    )
}


