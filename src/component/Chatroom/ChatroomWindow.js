import React from 'react'
import "./scss/ChatroomWindow.scss"
import Header from "./chatwindow/Header"
import Body from "./chatwindow/Body"
import Footer from "./chatwindow/Footer"
import { AppContext } from '../../context/AppProvider'
import { Alert } from "antd"
const isRenderChatRoom = WrappedComponent => props => { // curry
    const { selectedRoomId } = React.useContext(AppContext)
    return (
        <>
            {
                selectedRoomId
                    ?
                    <WrappedComponent
                        {...props}
                    />
                    :
                    (
                        <Alert
                            message='Hãy chọn phòng'
                            type='info'
                            showIcon
                            style={{ margin: 5 }}
                            closable
                        />
                    )
            }
        </>

    );
};

function ChatroomWindow() {
    const crollChat = React.useRef()

    const { selectedRoom, members, selectedRoomId } = React.useContext(AppContext)

    React.useEffect(() => {
        crollChat.current.scrollTo(0, crollChat.current.scrollHeight)
    }, [selectedRoom])

    return (
        <>
            <div className="chatwindow__header">
                <Header
                    selectedRoom={selectedRoom}
                    members={members}
                />
            </div>

            <div className="chatwindow__body">
                <div ref={crollChat} className="overflowY w-100 ">
                    <Body />
                </div>

            </div>
            <div className="chatwindow__footer">
                <Footer />
            </div>

        </>
    )
}
export default isRenderChatRoom(ChatroomWindow);