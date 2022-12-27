import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { ReactComponent as LoginEmpty } from "../../svgsfolder/LoginEmpty.svg";

export default function PlayerLogin() {
    const email = useRef();
    const password = useRef();
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
    function handleLogin() {
        const emailvalue = email.current.value;
        const passwordValue = password.current.value;
        if(emailvalue === '' || passwordValue === '') return 
        console.log('provided email: ' + emailvalue);
        console.log('provided password: ' + passwordValue);
    }
  return (
    // <div>playerLogin</div>
    <>
        <div className="loginEmpty">
            <form>
                <p>
                    <input type="text" placeholder="Email" ref={email} style={styleInput}/>
                </p>
                <p>
                    <input type="text" placeholder="Password" ref={password} style={styleInput}/>
                </p>
            </form>
            <EnterButton onClick={handleLogin}/>
        </div>
    </>
    )
}
