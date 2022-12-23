// import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import player_login from "./components/player_login";

export default function LoginRoom() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const nickname = useRef();

    function handleLogin() {
        const emailvalue = email.current.value;
        const passwordValue = password.current.value;
        const nicknameValue = nickname.current.value;
        if(emailvalue === '' || passwordValue === '' || nicknameValue === '') return 
        console.log('provided email: ' + emailvalue);
        console.log('provided password: ' + passwordValue);
        console.log('provided nickname: ' + nicknameValue);
    }
    
  return (
    <div className="grid h-screen place-items-center bg-main bg-cover">
            <div>
                <div>
                    <p
                        onClick={() => navigate("/second")}
                        className="text-9xl text-white font-bloomberg absolute slowAnim hover:translate-x-3 hover:-translate-y-3 cursor-pointer">
                        Bad Faith</p>
                </div>
                <div className="overflow-hidden">
                    <p className="text-9xl text-blue-600 font-bloomberg overflow-hidden static">
                        Bad Faith</p>
                </div>
            </div>
            {/* Login-text-field*/}
            <div>
                <p><input ref={email} type="text" placeholder="Enter your Email" /></p>
                <p><input ref={nickname} type="text" placeholder="Enter your nickname" /></p>
                <p><input ref={password} type="text" placeholder="Enter your Password" /></p>
                <p><button onClick={handleLogin}>Login</button></p>
            </div>
    </div>
  );
}
