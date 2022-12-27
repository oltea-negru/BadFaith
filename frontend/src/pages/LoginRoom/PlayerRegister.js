import React from 'react'
import { useState, useEffect, useRef } from "react";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";

export default function PlayerRegister() {
  const email = useRef();
  const password = useRef();
  const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}

  function hanldeRegister() {
    const emailvalue = email.current.value;
    const passwordValue = password.current.value;
    if(emailvalue === '' || passwordValue === '') return 
    console.log('Registering email: ' + emailvalue);
    console.log('Registering password: ' + passwordValue);
  }
  return (
    <div className='registerEmpty'>
      <form>
        <p><input type="text" placeholder="Email" ref={email} style={styleInput}/></p>
        <p><input type="text" placeholder="Password" ref={password} style={styleInput}/></p>
      </form>

      <EnterButton onClick={hanldeRegister}/>
    </div>
  )
}