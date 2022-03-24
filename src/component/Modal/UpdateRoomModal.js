import "./AddRoomModal.scss"
import React, { useState, useEffect } from 'react'
import { addDocument } from "../../firebase/services"
import { AppContext } from "../../context/AppProvider"
import { Modal, Button } from 'antd';
import { AuthContext } from "../../context/AuthProvider";
import { Avatar, Tooltip, message } from 'antd';

import { updateRoom } from "../../firebase/services"
const successUpdate = () => {
    message.success('Cập nhật thành công');
};
const successLeave = () => {
    message.success('Rời phòng thành công');
};
export default function UpdateRoomModal() {

    const { isRoomUpdateVisibale,
        setIsRoomUpdateVisible,
        selectedRoom, selectedRoomId,
        members,
        setSelectedRoomId

    } = React.useContext(AppContext)
    const { user: { uid } } = React.useContext(AuthContext)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        setName(selectedRoom.name)
        setDescription(selectedRoom.description)
        return () => {
            setName("")
            setDescription("")
        }
    }, [isRoomUpdateVisibale])

    const handleOk = () => {
        const data = {
            name: name,
            description: description
        }
        updateRoom(selectedRoomId, data)
        successUpdate()
        setIsRoomUpdateVisible(false)
    }

    const handleCancel = () => {

        setIsRoomUpdateVisible(false)
    }

    const handleLeave = () => {
        const [uid, ...newMembers] = selectedRoom.members
        const data = {
            members: newMembers
        }
        updateRoom(selectedRoomId, data)
        setSelectedRoomId("")
        successLeave()
        setIsRoomUpdateVisible(false)

    }
    return (
        <>
            <Modal
                title="Chi chiết phòng chat"
                visible={isRoomUpdateVisibale}
                onCancel={handleCancel}
                width={700}
                footer={[
                    <Button
                        key="Rời khỏi phòng"
                        onClick={handleLeave}
                        type="danger"
                    >
                        Rời khỏi phòng
                    </Button>,
                    <Button type="primary" onClick={handleOk}>
                        Cập nhật
                    </Button>,
                ]
                }
            >
                <div className="modal__addroom-row">
                    <div className="modal__addroom-title"
                        style={{ marginBottom: '10px' }}
                    >
                        Thành viên:
                    </div>
                    <Avatar.Group size={40} maxCount={2}>
                        {members.map((member, index) => (
                            <Tooltip title={member.displayName} key={index} >
                                <Avatar src={member.photoURL} key={index} size={40} >
                                    {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}

                                </Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>

                </div>
                <div className="modal__addroom-row">
                    <div className="modal__addroom-title">
                        Tên phòng:
                    </div>
                    <input
                        type="text"
                        className="modal__addroom-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div className="modal__addroom-row">
                    <div className="modal__addroom-title">
                        Mô tả:
                    </div>
                    <textarea
                        type="text"
                        className="modal__addroom-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </Modal >
        </>
    )
}
