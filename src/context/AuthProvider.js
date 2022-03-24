import React from 'react'
import Loading from "../component/Loading"
import { useNavigate, useLocation } from 'react-router-dom';
import useFireStore from "../hooks/useFireStore"
import { auth } from "../firebase/config"


export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {

    const navigate = useNavigate();
    const [user, setUser] = React.useState({})
    const [curentUser, setCurentUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const location = useLocation();

    React.useEffect(() => {
        const unsupcibed = auth.onAuthStateChanged((data) => {
            if (data) {
                const { uid } = data
                setUser({ uid, isSnapshot: true })
                setIsLoading(false)
                if (location.pathname !== '/login') {

                    navigate(location.pathname)
                } else {
                    navigate('/')
                }

            } else {
                setIsLoading(false)
                navigate('/login')
            }

        });
        return () => {
            unsupcibed()
        }
    }, [navigate, location.pathname])

    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: user.uid,
        };

    }, [user])

    const user2 = useFireStore("users", userCondition)

    React.useEffect(() => {
        if (user2[0]) {
            const { displayName, email, id, photoURL, uid } = user2[0]
            const data = { displayName, email, id, photoURL, uid }

            setCurentUser(data)
        }
    }, [user2])

    return (
        <AuthContext.Provider value={{ user, setUser, curentUser }}>
            {
                isLoading ? <Loading /> : children
            }
        </AuthContext.Provider>
    )
}
