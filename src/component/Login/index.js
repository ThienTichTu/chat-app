import "./login.scss"
import React from 'react'
import firebase, { auth } from "../../firebase/config"
import { addDocument, generateKeywords } from "../../firebase/services"
import { useNavigate } from 'react-router-dom';


const fbProvider = new firebase.auth.FacebookAuthProvider()


const Googleprovider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    const navigate = useNavigate();

    const handleLoginFB = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
        if (additionalUserInfo?.isNewUser) {
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                ProviderId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
        if (user) {
            navigate("/")
        }
    }

    const handleLoginGoogle = async () => {

        const { additionalUserInfo, user } = await auth.signInWithPopup(Googleprovider)

        if (additionalUserInfo?.isNewUser) {
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                ProviderId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
        if (user) {
            navigate("/")
        }
    }

    return (
        <div className="chat__login">
            <div className="chat__login-container">
                <h1 className="chat__login-title">Đăng nhập</h1>
                <div className="chat__login-form">
                    <button
                        onClick={handleLoginFB}
                        style={{ backgroundColor: "#008cff" }}
                    >
                        Đăng nhập bằng FaceBook
                    </button>
                    <button
                        onClick={handleLoginGoogle}
                        style={{ backgroundColor: "#ec5c5c" }}
                    >
                        Đăng nhập bằng Google
                    </button>
                </div>
            </div>
        </div>
    )
}
