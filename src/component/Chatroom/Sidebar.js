import React from 'react'
import "./scss/sidebar.scss"
import { PlusCircleOutlined } from "@ant-design/icons"
import UserInfor from "./sidebar/UserInfor"
import Roomlist from "./sidebar/Roomlist"
import Friendlist from "./sidebar/Friendlist"
import AddRoomModal from '../Modal/AddRoomModal'
import { AppContext } from "../../context/AppProvider"
export default function Sidebar() {
    const { setIsAddRoomsVisible } = React.useContext(AppContext)

    return (
        <>
            <UserInfor />
            <div className="sidebar__addroom"
                onClick={() => setIsAddRoomsVisible(true)}
            >
                <PlusCircleOutlined style={{ marginRight: "10px" }} className="sidebar__icon" />
                <span>
                    Thêm phòng
                </span>

            </div>

            <div className="sidebar__listroom">
                <Roomlist />
            </div>

            {/* <div className="sidebar__listFriend">
                <Friendlist />
            </div> */}
            <AddRoomModal />
        </>
    )
}
