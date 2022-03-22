import React from 'react'
import { Avatar } from 'antd';



export default function ItemChat({ data }) {


    return (
        <>
            {
                data.idSend &&
                <div className="chat__item"
                >
                    <div className="chat__item-avatar">
                        <Avatar
                            size={40}
                            src={data.idSend.photoURL}
                        >
                            {data.idSend.photoURL ? '' : data.idSend.displayName?.charAt(0)?.toUpperCase()}
                            A
                        </Avatar>
                    </div>
                    <div className={`chat__item-data ${data.idSend.isUser}`}>
                        <div className="chat__item-infor" >
                            <div className="chat__item-name">

                                <span>{data.idSend.displayName}</span>

                            </div>
                            <div className="chat__item-time">
                                {data.time}
                            </div>
                        </div>
                        <div className="chat__item-content">
                            <span>
                                {data.content}

                            </span>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
