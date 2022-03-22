import "./Loading.scss"
import React from 'react'

export default function Loading({ name }) {
    return (
        <>
            <div className="lds-roller-container">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1
                    style={{ marginLeft: "20px", fontSize: "50px" }}
                >
                    {name}
                </h1>
            </div>
        </>
    )
}
