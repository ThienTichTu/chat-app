import React from 'react'
import { Avatar } from 'antd'
import { auth } from "../../../firebase/config"
import { AuthContext } from "../../../context/AuthProvider"
import { AppContext } from "../../../context/AppProvider"
import 'antd/dist/antd.css';


export default function UserInfor() {

    const {
        curentUser: { displayName, photoURL },
    } = React.useContext(AuthContext)

    const { setIsUserUpdateVisible, setSelectedRoomId } = React.useContext(AppContext)

    const handleOnclick = () => {
        setIsUserUpdateVisible(true)
    }

    return (
        <>
            {
                displayName
                &&
                <div className="sidebar__infor">
                    <Avatar
                        size={40} className="sidebar__infor-avatar"
                        src={photoURL}
                        style={{ cursor: "pointer" }}
                        onClick={handleOnclick}

                    >
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div
                        className="sidebar__infor-name"
                        style={{ cursor: "pointer" }}
                        onClick={handleOnclick}

                    >
                        <h2>{displayName}</h2>
                    </div>
                    <button
                        className="sidebar__infor-logout"
                        onClick={() => {
                            setSelectedRoomId("")
                            auth.signOut()
                        }}
                    >
                        Đăng xuất
                    </button>
                </div>
            }
        </>
    )
}
