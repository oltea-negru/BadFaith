// import React from 'react'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import player_login from "./components/player_login";
import Register from "../assets/svg/RegisterComponent.svg";
import Login from "../assets/svg/LoginComponent.svg";
import Logo from "../assets/svg/Logo.svg";
import Settings from "../assets/svg/settingsComponent2.svg";


export default function LoginRoom()
{
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const styleButton = { backgroundColor: 'blue', fontSize: '23px', color: 'white', padding: '5px', borderRadius: '10px' }
  const styleInput = { backgroundColor: 'white', fontSize: '23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px' }
  const email = useRef();
  const password = useRef();
  const nickname = useRef();

  function playerLogin()
  {
    navigate("/playerLogin");
  }

  function playerRegister()
  {
    navigate("/playerRegister");
  }


  return <div className="bg-login_room bg-cover bg-center h-screen">
    <img onClick={playerLogin} src={Login} alt="Login player" className="hover:h-[90%] clickable absolute right-[5%] bottom-0 h-[85%]" />
    <img src={Logo} alt="Logo" className="py-4 ml-[25%]  h-1/3" />
    <img src={Settings} alt="Settings" className="absolute h-1/2 top-[46%] left-[50%]" />
    <img onClick={playerRegister} src={Register} alt="Register player" className="hover:h-[40%] clickable absolute h-1/3 top-[10%] left-[5%]" />
  </div>

}
