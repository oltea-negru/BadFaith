// import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import player_login from "./components/player_login";
import {playerRegister} from "../../api/config.json";
import { ReactComponent as EntryPage } from "../../svgsfolder/EntryPage.svg";
import { ReactComponent as LoginComponent } from "../../svgsfolder/LoginComponent.svg";
import { ReactComponent as LoginField } from "../../svgsfolder/Login.svg";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { ReactComponent as Emailfield } from "../../svgsfolder/EmailField.svg";
import { ReactComponent as Passwordfield } from "../../svgsfolder/PasswordField.svg";
import { ReactComponent as ReturnArrow } from "../../svgsfolder/ReturnArrow.svg";

export default function LoginRoom() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const styleButton = {backgroundColor : 'blue', fontSize:'23px', color: 'white', padding: '5px', borderRadius: '10px'}
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
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
        //console.log("this value is" + playerRegister);
    }
    
  return (
    // <div className="grid h-screen place-items-center bg-main bg-cover">
    //         <div>
    //             <div>
    //                 <p
    //                     onClick={() => navigate("/second")}
    //                     className="text-9xl text-white font-bloomberg absolute slowAnim hover:translate-x-3 hover:-translate-y-3 cursor-pointer">
    //                     Bad Faith</p>
    //             </div>
    //             <div className="overflow-hidden">
    //                 <p className="text-9xl text-blue-600 font-bloomberg overflow-hidden static">
    //                     Bad Faith</p>
    //             </div>
    //         </div>
    //         {/* Login-text-field*/}
    //         <div>
    //             <p><input ref={email} type="text" style={styleInput} size="30" placeholder="Enter your Email" /></p>
    //             <p><input ref={nickname} type="text" style={styleInput} size="30" placeholder="Enter your nickname" /></p>
    //             <p><input ref={password} type="text" style={styleInput} size="30" placeholder="Enter your Password" /></p>
    //             <p align="center"><button onClick={handleLogin} style={styleButton}>Login</button></p>
    //         </div>
    // </div>
    <div>
        <EntryPage/>
        <div>
            <LoginComponent/>
            <LoginField/>
            <Emailfield/>
            <Passwordfield/>
            <EnterButton/>
            <ReturnArrow/>
        </div>
    </div>
  );
}
