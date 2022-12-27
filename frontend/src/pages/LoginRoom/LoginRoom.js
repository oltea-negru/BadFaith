// import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import player_login from "./components/player_login";
import {playerRegister} from "../../api/config.json";
import { ReactComponent as EntryPage } from "../../svgsfolder/EntryPageEmpty.svg";
import { ReactComponent as LoginComponent } from "../../svgsfolder/LoginComponent.svg";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import "../../index.css"

export default function LoginRoom() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const styleButton = {backgroundColor : 'blue', fontSize:'23px', color: 'white', padding: '5px', borderRadius: '10px'}
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
    const email = useRef();
    const password = useRef();
    //const nickname = useRef();
    

    function handleLogin() {
        const emailvalue = email.current.value;
        const passwordValue = password.current.value;
        //const nicknameValue = nickname.current.value;
        if(emailvalue === '' || passwordValue === '') return 
        console.log('provided email: ' + emailvalue);
        console.log('provided password: ' + passwordValue);
        //console.log('provided nickname: ' + nicknameValue);
        //console.log("this value is" + playerRegister);
    }

    function playerLogin() {
        navigate("/playerLogin");
    }
    
    return (
      <>
      <div className="mainBg">
        <button onClick={playerLogin}>
          <LoginComponent/>
        </button>
        {/* <button onClick={displayFields}> */}
        {/* Turn the Login Component into a button that routes to the next page */}
        <div className="loginFields"><LoginComponent/>
          <input type="text" placeholder="Email" ref={email} style={styleInput}/>
          <input type="password" placeholder="Password" ref={password} style={styleInput}/>
          {/* <input type="text" placeholder="Nickname" ref={nickname} style={styleInput}/> */}
          <EnterButton onClick={handleLogin} style={styleButton}/>
        </div>
          

        {/* </button> */}
      </div>
      </>
    );
}
