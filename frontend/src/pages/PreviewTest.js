import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


export default function PreviewTest()
{
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch()

    const { stats, nickname, email, password, avatar } = useSelector(state => state.user)


    return <div className="bg-waiting_lobby bg-center grid place-items-center h-screen">
        <div>
            {isHovering && <ProfilePreview />}
            <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                <img src={avatar} alt="Avatar" className="bg-white h-36 rounded-lg" />
            </div>
        </div>

    </div >
};

const ProfilePreview = () =>
{
    const { stats, nickname, email, password, avatar } = useSelector(state => state.user)
    return (
        <div className="bg-white absolute h-24 top-20 transition-opacity ease-in duration-700 opacity-100 ">
            Name: {nickname}
            <br />
            Email: {email}
            <br />



        </div>
    );
};


