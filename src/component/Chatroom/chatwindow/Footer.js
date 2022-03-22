import React from 'react'
import { SendOutlined } from "@ant-design/icons"
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import firebase, { db } from "../../../firebase/config"

function Usekey(key, cb) {
    const callbackRef = React.useRef(cb)

    React.useEffect(() => {
        callbackRef.current = cb
    })

    React.useEffect(() => {

        function handle(event) {
            if (event.key === key) {
                callbackRef.current(event)
            }
        }


        document.addEventListener("keypress", handle)
        return () => document.removeEventListener("keypress", handle)
    }, [key])
}

export default function Footer() {

    const { selectedRoomId, selectedRoom, rooms } = React.useContext(AppContext)
    const { curentUser } = React.useContext(AuthContext)
    const [text, setText] = React.useState('')


    const handleSend = () => {
        var date = new Date();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const time = `${date.getHours()}:${minute} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

        const roomRef = db.collection('rooms').doc(selectedRoomId);
        const dataAdd = {
            time: time,
            content: text,
            idSend: curentUser.uid
        }
        if (text.length !== 0) {
            roomRef.update({
                dataChat: firebase.firestore.FieldValue.arrayUnion(dataAdd)
            });
        }
        setText("")
    }

    Usekey("Enter", handleSend)


    return (
        <>
            <div className="footer__input">
                <input
                    type="text"
                    value={text}
                    placeholder="Nhập tin nhắn...."
                    onChange={(e) => setText(e.target.value)}
                />
                <SendOutlined
                    style={{ fontSize: "26px", cursor: "pointer", paddingLeft: "20px", color: "#7269ef" }}
                    onClick={handleSend}
                />
            </div>
        </>
    )
}
