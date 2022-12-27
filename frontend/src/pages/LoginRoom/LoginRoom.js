// import React from 'react'
import { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
//import player_login from "./components/player_login";
import {playerRegister} from "../../api/config.json";
import { ReactComponent as EntryPage } from "../../svgsfolder/EntryPageEmpty.svg";
import { ReactComponent as LoginComponent } from "../../svgsfolder/LoginComponent.svg";
import { ReactComponent as RegisterPlayer } from "../../svgsfolder/RegisterComponent.svg";



import "../../index.css"

export default function LoginRoom() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const styleButton = {backgroundColor : 'blue', fontSize:'23px', color: 'white', padding: '5px', borderRadius: '10px'}
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
    const email = useRef();
    const password = useRef();
    const nickname = useRef();
    
    function playerLogin() {
        navigate("/playerLogin");
    }

    function playerRegister() {
        navigate("/playerRegister");
    }
    
    return (
      <>
      <div className="mainBg">
        <button onClick={playerRegister}>
          <RegisterPlayer/>
        </button>
        <button onClick={playerLogin}>
          <LoginComponent/>
        </button>
      </div>
      </>
    );
}
