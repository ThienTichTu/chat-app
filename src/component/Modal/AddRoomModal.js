import "./AddRoomModal.scss"
import React, { useState } from 'react'
import { addDocument } from "../../firebase/services"
import { AppContext } from "../../context/AppProvider"
import { Modal } from 'antd';
import { AuthContext } from "../../context/AuthProvider";
export default function AddRoomModal() {

    const { isAddRoomsVisible, setIsAddRoomsVisible } = React.useContext(AppContext)
    const { user: { uid } } = React.useContext(AuthContext)
    const [data, setData] = useState({
        name: "",
        description: "",
    })

    const handleOk = () => {
        // addroom
        addDocument('rooms', {
            ...data,
            members: [uid],
            dataChat: []
        })
        setData({
            name: "",
            description: "",
        })
        setIsAddRoomsVisible(false)
    }

    const handleCancel = () => {
        setData({
            name: "",
            description: "",
        })
        setIsAddRoomsVisible(false)
    }

    return (
        <>
            <Modal
                title="Thêm Phòng"
                visible={isAddRoomsVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="modal__addroom-row">
                    <div className="modal__addroom-title">
                        Tên room:
                    </div>
                    <input
                        type="text"
                        className="modal__addroom-input"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                </div>
                <div className="modal__addroom-row">
                    <div className="modal__addroom-title">
                        Tên room:
                    </div>
                    <textarea
                        type="text"
                        className="modal__addroom-textarea"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />

                </div>
            </Modal>
        </>
    )
}
