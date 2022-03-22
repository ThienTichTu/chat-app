import React from 'react'
import ItemChat from './ItemChat';
import { AppContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/AuthProvider';
export default function Body() {
    const { selectedRoom, members, selectedRoomId } = React.useContext(AppContext)
    const { curentUser } = React.useContext(AuthContext)
    const [chat, setChat] = React.useState([])

    React.useEffect(() => {

        const newDataChat = selectedRoom.dataChat.map(data => {

            const newUser = members.filter(item => item.uid === data.idSend)

            if (newUser[0]) {
                if (newUser[0].uid === curentUser.uid) {

                    newUser[0].isUser = "isUser"
                } else {
                    newUser[0].isUser = "notUser"
                }
            }
            return {
                ...data,
                idSend: newUser[0],

            }
        })
        setChat(newDataChat)

    }, [selectedRoomId, members])

    return (
        <>

            {
                chat.map((item, index) =>
                    <div key={index}>
                        <ItemChat
                            data={item}

                        />
                    </div>
                )
            }

        </>
    )
}
