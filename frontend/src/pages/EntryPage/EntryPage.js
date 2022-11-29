import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EntryBackground from '../../assets/images/EntryPage.svg'
import LoginComponent from '../../assets/images/LoginComponent.svg'

export default function EntryPage()
{
    return (
        <div className="relative w-full">
            <img className="absolute" src={EntryBackground} alt="EntryBackground"/>
            <img className="absolute mt-[2%] left-[70%] scale-[0.8]" src={LoginComponent} alt="LoginComponent"/>
        </div>
    );
}