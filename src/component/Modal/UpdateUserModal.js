import React, { useState, useEffect } from 'react'
import "./UpdateUserModal.scss"
import { AppContext } from "../../context/AppProvider"
import { AuthContext } from "../../context/AuthProvider"
import { Modal, Avatar, Button } from 'antd';
import { storage, db } from "../../firebase/config"
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage"
import { updateUser, generateKeywords } from "../../firebase/services"
export default function UpdateUserModal() {
    const {
        isUserUpdateVisibale,
        setIsUserUpdateVisible,
    } = React.useContext(AppContext)

    const { curentUser: { displayName, photoURL, email, uid, id }, user, setUser } = React.useContext(AuthContext)
    const [isUpdate, setIsUpdate] = useState(false)

    const [name, setName] = useState()

    const [emaiL, setEmaiL] = useState()

    const [image, setImage] = React.useState();
    const [preview, setPreview] = useState()
    const [getUrlErr, setGetUrlErr] = React.useState("");

    useEffect(() => {
        setName(displayName)
        setEmaiL(email)
        setPreview(photoURL)
    }, [isUserUpdateVisibale])

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview)
        }
    }, [preview])

    const handleOk = () => {
        if (image) {
            const nameIMG = Math.floor(Math.random() * 100000000000000);

            const storageRef = ref(storage, `avatar/${nameIMG}`);

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => { setGetUrlErr(`avatar/${nameIMG}`) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setGetUrlErr(`avatar/${nameIMG}`)
                    });
                }
            );
        } else {
            const newData = {
                displayName: name,
                email: emaiL,
                keywords: generateKeywords(name)
            }
            updateUser(id, newData)
            setIsUpdate(false);
            setUser({ ...user, isSnapshot: !user.isSnapshot })
            setIsUserUpdateVisible(false)
        }
    }

    React.useEffect(() => {
        if (getUrlErr !== "") {
            const storageRef = ref(storage, getUrlErr);

            getDownloadURL(storageRef).then((downloadURL) => {
                // update user
                const newData = {
                    displayName: name,
                    email: emaiL,
                    photoURL: downloadURL,
                    keywords: generateKeywords(name)
                }
                updateUser(id, newData)
                setIsUpdate(false);
                setUser({ ...user, isSnapshot: !user.isSnapshot })

                setIsUserUpdateVisible(false)


            });
        }
        return () => {
            setGetUrlErr("")
        }
    }, [getUrlErr])

    const handleCancel = () => {
        setIsUpdate(false);

        setIsUserUpdateVisible(false)
    }

    const handleOnChangeAvatar = (e) => {
        if (e.target.files[0]) {
            const a = URL.createObjectURL(e.target.files[0])
            setPreview(a)
            setImage(e.target.files[0])
        }
    }


    return (
        <div>
            <Modal
                title="Thông tin cá nhân"
                visible={isUserUpdateVisibale}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                <div className="modal__userupdate">

                    <Avatar
                        src={preview}
                        className="modal__userupdate-avatar"
                    >
                        {preview ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {
                        isUpdate &&
                        <>

                            <input
                                type="file" id="avatar_update"
                                onChange={handleOnChangeAvatar}
                            />


                            <Button
                                type="dashed" danger
                                style={{ marginTop: "15px" }}
                            >
                                <label htmlFor="avatar_update" className="modal__userupdate-label">
                                    Thay đổi avatar
                                </label>
                            </Button>

                        </>
                    }
                    <div className="modal__userupdate-name">
                        {
                            isUpdate ?
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                :
                                <span>
                                    {displayName}
                                </span>
                        }


                    </div>
                    <div className="modal__userupdate-email">
                        {
                            !isUpdate
                                ?
                                <span>
                                    {email}
                                </span>
                                :
                                <input
                                    type="text"
                                    value={emaiL}
                                    onChange={(e) => setEmaiL(e.target.value)}
                                />
                        }

                    </div>
                    <Button
                        type="primary" ghost
                        style={{ marginTop: "15px" }}
                        onClick={() => setIsUpdate(!isUpdate)}
                    >
                        Cập nhật thông tin
                    </Button>
                </div>
            </Modal >
        </div >
    )
}
