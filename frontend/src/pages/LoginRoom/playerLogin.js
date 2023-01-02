import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EnterButton } from "../../svgsfolder/Enter.svg";
import { ReactComponent as LoginEmpty } from "../../svgsfolder/LoginEmpty.svg";
import { useSelector, useDispatch, } from 'react-redux'
import { setUserDetails, setCredentials } from "../../redux/slices/userSlice";

// export default function PlayerLogin() {
//     const email = useRef();
//     const password = useRef();
//     const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
//     function handleLogin() {
//         const emailvalue = email.current.value;
//         const passwordValue = password.current.value;
//         if(emailvalue === '' || passwordValue === '') return 
//         console.log('provided email: ' + emailvalue);
//         console.log('provided password: ' + passwordValue);
//     }
//   return (
//     // <div>playerLogin</div>
//     <>
//         <div className="loginEmpty">
//             <form>
//                 <p>
//                     <input type="text" placeholder="Email" ref={email} style={styleInput}/>
//                 </p>
//                 <p>
//                     <input type="text" placeholder="Password" ref={password} style={styleInput}/>
//                 </p>
//             </form>
//             <EnterButton onClick={handleLogin}/>
//         </div>
//     </>
//     )
// }

export default function PlayerLogin() {
    //const email = useRef();
    const pwd = useRef();
    const styleInput = {backgroundColor : 'white', fontSize:'23px', color: 'black', padding: '5px', borderRadius: '10px', margin: '5px'}
    function handleLogin() {
        const emailvalue = email.current.value;
        const passwordValue = password.current.value;
        if(emailvalue === '' || passwordValue === '') return 
        console.log('provided email: ' + emailvalue);
        console.log('provided password: ' + passwordValue);
    }
    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('');
    const dispatch = useDispatch()
    
    const { stats, nickname, email, password } = useSelector(state => state.user)
  return (
    // <div>playerLogin</div>
    // <>
    //     <div className="loginEmpty">
    //         <form>
    //             <p>
    //                 <input type="text" placeholder="Email" ref={email} style={styleInput}/>
    //             </p>
    //             <p>
    //                 <input type="text" placeholder="Password" ref={password} style={styleInput}/>
    //             </p>
    //         </form>
    //         <EnterButton onClick={handleLogin}/>
    //     </div>
    // </>
    <>
    
    <div className="loginEmpty">
        <form>
            <p>
                <input type="text" id="email" name="email" placeholder="Email" style={styleInput} value={emailInput} onChange={event => setEmail(event.target.value)}/> 
            </p>
            <p>
                <input type="text" id="password" name="password" placeholder="Password" style={styleInput} value={passwordInput} onChange={event => setPassword(event.target.value)}/> 
            </p>
        </form>
            <p>
                <button className="outline" onClick={() => dispatch(setCredentials({email: emailInput, password: passwordInput}))}><EnterButton/></button>
            </p>
            {/* Need to navigate to lobby here */}
            {/* <button className="outline" onClick={() => navigate("/settings")}>Go to second page</button> */}
    </div>
    </>
    )
}


