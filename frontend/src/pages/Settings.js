import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { player_Settings } from "../api/examplePlayerMethods.js";

import
{
    setSettings,
    incrementWin,
    incrementGame,
} from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import SettingsExpanded from "../assets/svg/SettingsExpanded.svg";
import Avatar0 from "../assets/avatars/placeholder.svg";
import Avatar1 from "../assets/avatars/avatar-1.svg";
import Avatar2 from "../assets/avatars/avatar-2.svg";
import Avatar3 from "../assets/avatars/avatar-3.svg";
import Avatar4 from "../assets/avatars/avatar-4.svg";
import Avatar5 from "../assets/avatars/avatar-5.svg";
import Avatar6 from "../assets/avatars/avatar-6.svg";
import Avatar7 from "../assets/avatars/avatar-7.svg";
import Avatar8 from "../assets/avatars/avatar-8.svg";
import Avatar9 from "../assets/avatars/avatar-9.svg";
import EditAvatar from "../assets/svg/edit.svg";
import RemoveAvatar from "../assets/svg/bin.svg";
import SeePassword from "../assets/svg/eye-opened.svg";
import HidePassword from "../assets/svg/eye-closed.svg";
import Return from "../assets/svg/ReturnArrow.svg"

function Settings()
{
    const dispatch = useDispatch();

    const { nickname, email, password, avatar } = useSelector(
        (state) => state.user
    );

    const [nicknameInput, setNickname] = useState(nickname);
    const [passwordInput, passwordChange] = useState(password);
    // const [passwordChange, setNewPassword] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarInput, setAvatarInput] = useState(avatar);
    // setAvatarInput(Avatar0);

    const navigate = useNavigate();

    console.log(showOptions);

    const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9]

    const avatarsChoice = [
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar5,
        Avatar6,
        Avatar7,
        Avatar8,
        Avatar9,
    ].map((avatar, index) => (
        <img
            src={avatar}
            onClick={() =>
            {
                setShowOptions(false);
                setAvatarInput(index + 1)
            }}
            alt="Avatar"
            className="h-32 custom-transition rounded-lg hover:h-44  hover:cursor-pointer"
        />
    ));

    function navigateToLobby()
    {
        navigate("/lobby");
    }

    async function saveSettings()
    {
        var message = null;
        if (passwordInput === "")
        {
            passwordChange(password)
            message = await (player_Settings(email, nicknameInput, password, avatarInput))
            console.log(message.msg)
            if (message.msg === "Nickname and password succesfully changed")
            {
                console.log("dispatched settings")
                dispatch(setSettings({ nickname: nicknameInput, password: password, avatar: avatarInput }))
                alert("Settings saved")
            } else
            {
                alert(message.msg)
            }
        }
        else
        {
            message = await (player_Settings(email, nicknameInput, passwordInput, avatarInput))
            console.log(message.msg)
            if (message.msg === "Nickname and password succesfully changed")
            {
                console.log("dispatched settings")
                dispatch(setSettings({ nickname: nicknameInput, password: passwordInput, avatar: avatarInput }))
                alert("Settings saved")
            } else
            {
                alert(message.msg)
            }
        }
    }

    return showOptions ? (
        <div className="relative grid place-items-center bg-waiting_lobby h-screen w-screen bg-bottom">
            <div className="h-1/3 w-full flex flex-row justify-around items-center bg-waiting_lobby bg-bottom border-[#7b6437] border-8">
                {avatarsChoice}
            </div>
        </div>
    ) : (
        <div className="relative grid place-items-center bg-waiting_lobby bg-top ">
            <img
                src={SettingsExpanded}
                alt="Settings"
                className="w-3/5 h-screen max-w-[800px]"
            />

            <div className="absolute flex-col text-white text-3xl font-another w-3/5 h-[70%] max-w-[600px] max-h-[600px] justify-between mt-[7%] items-center flex ">
                <div className="">
                    <img src={avatars[avatarInput]} alt="Avatar" className="h-36 rounded-lg border-4 border-white bg-white" />
                    <div className="flex flex-row justify-around mt-1">
                        <img
                            src={EditAvatar}
                            alt="Edit Avatar"
                            onClick={() => setShowOptions(true)}
                            className="w-10 bg-[#7ec4ba] invert p-1 rounded-md m-1 hover:shadow-sm hover:cursor-pointer hover:shadow-black"
                        />
                        <img
                            src={RemoveAvatar}
                            alt="Remove Avatar"
                            onClick={() => setAvatarInput(0)}
                            className="w-10 bg-[#7ec4ba] invert p-1 rounded-md m-1 hover:shadow-sm hover:cursor-pointer hover:shadow-black"
                        />
                    </div>
                </div>
                <div className="flex flex-row w-full m-3 justify-between">
                    <label for="nickname" className="font-another">
                        Email:
                    </label>
                    <input
                        className="settingsInput text-black"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) =>
                        {
                            setNickname(event.target.value);
                            console.log(event.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-row w-full m-3 justify-between">
                    <label for="nickname" className="font-another">
                        Nickname:
                    </label>
                    <input
                        className="settingsInput text-black"
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={nicknameInput}
                        onChange={(event) =>
                        {
                            setNickname(event.target.value);
                            console.log(event.target.value);
                        }}
                    />
                </div>
                <div className="w-full flex flex-row">
                    <div className="flex flex-row w-full justify-between">
                        <label for="password">Password:</label>
                        {showPassword ? (
                            <input
                                className="settingsInput text-black"
                                type="text"
                                id="password"
                                name="password"
                                value={passwordInput}
                                onChange={(event) =>
                                {
                                    passwordChange(event.target.value);
                                    console.log(event.target.value);
                                }}
                            />
                        ) : (
                            <input
                                className="settingsInput text-black"
                                type="password"
                                id="password"
                                name="password"
                                value={passwordInput}
                                onChange={(event) =>
                                {
                                    passwordChange(event.target.value);
                                    console.log(event.target.value);
                                }}
                            />
                        )}
                    </div>
                    {showPassword ? (
                        <img
                            src={SeePassword}
                            alt="See Password"
                            onClick={() => setShowPassword(false)}
                            className="w-10 absolute rounded-lg right-2 ml-10 hover:cursor-pointer"
                        />
                    ) : (
                        <img
                            src={HidePassword}
                            alt="Hide Password"
                            onClick={() => setShowPassword(true)}
                            className="w-10 absolute rounded-lg right-2 ml-10 hover:cursor-pointer"
                        />
                    )}
                </div>

                <button
                    className="settingsButton
                hover:shadow-sm hover:shadow-white focus:outline-none focus:ring-0 active:bg-red-300 active:shadow-lg custom-transition "
                    onClick={() =>
                    {
                        // dispatch(
                        //     setSettings({
                        //         nickname: nicknameInput,
                        //         password: passwordInput,
                        //         avatar: avatarInput,
                        //     })
                        // )
                        saveSettings({ nickname: nicknameInput, password: passwordInput, avatar: avatarInput })
                        // alert("Profile updated successfully!");
                    }}
                >
                    Submit Changes
                </button>

            </div>
            <div className='absolute bottom-20 left-20 flex flex-col hover:cursor-pointer '>
                <button className='focus:outline-none text-3xl  text-white '>Back</button>
                <img src={Return} alt="Return Button" className="h-10 hover:h-12 custom-transition" onClick={() => navigateToLobby()} />
            </div>
        </div>
    );
}

export default Settings;
