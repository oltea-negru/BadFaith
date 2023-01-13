import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterButton from "../assets/svg/Enter.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setCredentials } from "../redux/slices/userSlice";
import { player_Login } from "../api/examplePlayerMethods.js";
import { login_status } from "../api/examplePlayerMethods.js";
import Return from "../assets/svg/ReturnArrow.svg"
import { loginPlayer } from '../redux/middleware/gameServerMiddleware';

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
            if (status.msg === 'OK')
            {
                console.log("User LogedIn, Dispatching credentials")
                dispatch(setCredentials({ email: emailInput, password: passwordInput }))
                alert("Logged In successfully!");
                navigateToLobby();
            }
            else
            {
                alert("Login failed!" + status.msg);
            }
        } else
        {
            alert(message.msg);
        }
        console.log("current User: " + email + " " + password)
    }

    useEffect(() => {
        if(email!='' && password!='')
            navigate("/lobby")
    }, [email, password])

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
            <div className='bg-login bg-cover font-another bg-top h-screen grid place-items-center'>
                <form className='flex flex-col justify-evenly h-1/3' >
                    <input type="text" id="email" name="email" placeholder="Email" className='input' value={emailInput} onChange={event => setEmail(event.target.value)} />
                    <input type="password" id="password" name="password" placeholder="Password (8-30 chars)" className='input' value={passwordInput} onChange={event => setPassword(event.target.value)} />
                </form>
                <div className='absolute right-0 bottom-0 overflow-hidden'>
                    <img src={EnterButton} alt="Register Button" className="hover:cursor-pointer h-[400px] translate-x-28 translate-y-28 hover:h-[430px] hover:rotate-45  custom-transition " onClick={() => dispatch(loginPlayer( emailInput, passwordInput ))} />
                </div>
                <div className='absolute bottom-20 left-20 flex flex-col hover:cursor-pointer '>
                    <button className='focus:outline-none text-3xl  text-white ' onClick={() => navigateToHome()}>Back</button>
                    <img src={Return} alt="Return Button" className="h-10 hover:h-12 custom-transition" onClick={() => navigateToHome()} />
                </div>
            </div>
        </>
    )
}


