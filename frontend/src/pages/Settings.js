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
import EditAvatar from "../assets/svg/edit.svg";
import RemoveAvatar from "../assets/svg/bin.svg";
import SeePassword from "../assets/svg/eye-opened.svg";
import HidePassword from "../assets/svg/eye-closed.svg";

function Settings()
{
    const dispatch = useDispatch();

    const { nickname, email, password, avatar } = useSelector(
        (state) => state.user
    );

    const [nicknameInput, setNickname] = useState(nickname);
    const [passwordInput, passwordChange] = useState("");
    // const [passwordChange, setNewPassword] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [avatarInput, setAvatarInput] = useState(avatar);

    const navigate = useNavigate();

    console.log(showOptions);

    const avatars = [
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar5,
        Avatar6,
        Avatar7,
    ].map((avatar) => (
        <img
            src={avatar}
            onClick={() =>
            {
                setAvatarInput(avatar);
                setShowOptions(false);
            }}
            alt="Avatar"
            className="h-32 hover:transition ease-out duration-500  rounded-lg hover:h-44  hover:cursor-pointer"
        />
    ));

    function navigateToLobby()
    {
        navigate("/lobby");
    }

    async function saveSettings() {
        var message = null;
        if (passwordInput === "") {
            passwordChange(password)
            message = await (player_Settings(email, nicknameInput, password))
            console.log(message.msg)
            if (message.msg === "Nickname and password succesfully changed") {
                console.log("dispatched settings")
                dispatch(setSettings({nickname: nicknameInput, password: password, avatar: avatarInput }))
                alert("Settings saved")
            } else {
                alert(message.msg)
            }
        }
        else {
            message = await (player_Settings(email, nicknameInput, passwordInput))
            console.log(message.msg)
            if (message.msg === "Nickname and password succesfully changed") {
                console.log("dispatched settings")
                dispatch(setSettings({nickname: nicknameInput, password: passwordInput, avatar: avatarInput }))
                alert("Settings saved")
            } else {
                alert(message.msg)
            }
        }
    }

    return showOptions ? (
        <div className="relative grid place-items-center bg-waiting_lobby h-screen w-screen bg-bottom">
            <div className="h-1/3 w-full flex flex-row justify-around items-center bg-waiting_lobby bg-bottom border-[#7b6437] border-8">
                {avatars}
            </div>
        </div>
    ) : (
        <div className="relative grid place-items-center bg-waiting_lobby bg-top ">
            <img
                src={SettingsExpanded}
                alt="Settings"
                className="w-2/5 h-screen min-h-[600px] min-w-[550px]"
            />

            <div className="absolute flex-col text-white text-3xl font-another w-1/3 min-w-[300px] h-2/3 justify-between  mt-28 items-center flex ">
                <div>
                    <img src={avatar === 0 ? Avatar0 : avatars[avatar]} alt="Avatar" className="h-36 rounded-lg " />
                    <div className="flex flex-row">
                        <img
                            src={EditAvatar}
                            alt="Edit Avatar"
                            onClick={() => setShowOptions(true)}
                            className="w-10 avatarButton "
                        />
                        <img
                            src={RemoveAvatar}
                            alt="Remove Avatar"
                            onClick={() => setAvatarInput(Avatar0)}
                            className="avatarButton"
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
                        ) : (
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
                hover:shadow-sm hover:shadow-white focus:outline-none focus:ring-0 active:bg-red-300 active:shadow-lg transition duration-150 ease-in-out "
                    onClick={() =>
                    {
                        // dispatch(
                        //     setSettings({
                        //         nickname: nicknameInput,
                        //         password: passwordInput,
                        //         avatar: avatarInput,
                        //     })
                        // )
                        saveSettings({nickname: nicknameInput, password: passwordInput, avatar: avatarInput})
                        // alert("Profile updated successfully!");
                    }}
                >
                    Submit Changes
                </button>

            </div>
            <button className='bg-black p-2 rounded-lg active:text-4xl hover:text-4xl focus:outline-none absolute bottom-10 left-20 text-3xl text-white' onClick={() => navigateToLobby()}>Back</button>
        </div>
    );
}

export default Settings;
