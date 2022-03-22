import React from 'react'
import "./scss/index.scss"
import Sidebar from './Sidebar.js'
import ChatroomWindow from './ChatroomWindow.js'
export default function ChatRoom() {
    return (
        <div className="chatroom">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="chatwindow">
                <ChatroomWindow />
            </div>
        </div>
    )
}
