import React from 'react'

import useFireStore from "../hooks/useFireStore"
import { AuthContext } from "./AuthProvider"

export const AppContext = React.createContext();
export default function AppProvider({ children }) {

    const [isAddRoomsVisible, setIsAddRoomsVisible] = React.useState(false)
    const [isUserUpdateVisibale, setIsUserUpdateVisible] = React.useState(false)
    const [isRoomUpdateVisibale, setIsRoomUpdateVisible] = React.useState(false)

    const [selectedRoomId, setSelectedRoomId] = React.useState("")
    const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState()

    const {
        user: { uid },
    } = React.useContext(AuthContext);


    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFireStore('rooms', roomsCondition)
    const selectedRoom = React.useMemo(
        () => {

            return rooms.find((room) => room.id === selectedRoomId) || { name: "", displayName: "", members: [], dataChat: [] }
        },
        [rooms, selectedRoomId]
    );

    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };

    }, [selectedRoomId, selectedRoom])
    
    const members = useFireStore('users', userCondition)


    return (
        <AppContext.Provider value={
            {
                rooms,
                isAddRoomsVisible,
                setIsAddRoomsVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                members,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                isUserUpdateVisibale,
                setIsUserUpdateVisible,
                isRoomUpdateVisibale,
                setIsRoomUpdateVisible
            }
        }
        >
            {children}
        </AppContext.Provider>
    )
}
