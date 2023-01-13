// import React from 'react'
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import player_login from "./components/player_login";
import Register from "../assets/svg/RegisterComponent.svg";
import Login from "../assets/svg/LoginComponent.svg";
import Logo from "../assets/svg/Logo.svg";
import Settings from "../assets/svg/WelcomeComponent.svg";
import Table from "../assets/svg/TableComponent.svg";

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
    navigate("/login");
  }

  function playerRegister()
  {
    navigate("/register");
  }

  return <div className="bg-login_room bg-cover bg-center h-screen">
    <img onClick={playerLogin} src={Login} alt="Login player" className="hover:h-[90%]  clickable absolute right-[5%] bottom-0 h-[85%]  custom-transition" />
    <img src={Logo} alt="Logo" className="py-4 ml-[25%]  h-1/3" />
    <div className="absolute flex flex-col justify-end bottom-0 lg:left-[5%] left-[25%] h-1/2 w-2/3">
      <img src={Settings} alt="Welcome" className="ml-[50%] lg:ml-[30%] h-1/2 max-h-[200px]" />
      <img src={Table} alt="Table" className="h-fit w-full max-h-[350px]" />
    </div>
    <img onClick={playerRegister} src={Register} alt="Register player" className="hover:h-[40%] clickable absolute h-1/3 top-[10%] left-[5%]  custom-transition" />
  </div >

}
