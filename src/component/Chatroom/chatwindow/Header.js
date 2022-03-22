import React from 'react'
import { Avatar, Tooltip } from 'antd';
import { UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { AppContext } from "../../../context/AppProvider"
export default function Header({ selectedRoom, members }) {
    const { setIsInviteMemberVisible, setIsRoomUpdateVisible } = React.useContext(AppContext)


    return (
        <>
            <div className="chatwindow__header-infor">
                <span>
                    {selectedRoom.name}
                </span>
                <div className="header__infor-description">
                    {selectedRoom.description}
                </div>
            </div>

            <div className="chatwindow__header-member">
                <div className='chatwindow__header-adduser'
                    onClick={() => setIsRoomUpdateVisible(true)}
                >
                    <SettingOutlined style={{ fontSize: "26px" }} className="chatwindow__header-setting" />

                </div>
                <div className='chatwindow__header-adduser'
                    onClick={() => setIsInviteMemberVisible(true)}
                >
                    <UserAddOutlined style={{ fontSize: "26px", marginRight: '10px' }} />
                    <span>
                        Mời
                    </span>
                </div>
                <Avatar.Group size={40} maxCount={2}>
                    {members.map((member) => (
                        <Tooltip title={member.displayName} key={member.id} >
                            <Avatar src={member.photoURL} size={40} >
                                {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}

                            </Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>

            </div>
        </>
    )
}
