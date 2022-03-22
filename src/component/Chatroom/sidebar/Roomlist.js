import React from 'react'
import { Collapse } from 'antd';
import styled from 'styled-components'
import { AppContext } from "../../../context/AppProvider"

import 'antd/dist/antd.css';

const { Panel } = Collapse;

const PanelStyle = styled(Panel)`
    &&& {
        .ant-collapse-header{
            color: #000;
            font-size: 20px;
        }
        .ant-collapse-content-box{
            padding-left: 40px;
            padding-top: 10px;
            font-size: 18px;
            padding-bottom: 0px;
        }
    }
`;

export default function Roomlist() {
    const { rooms, setSelectedRoomId } = React.useContext(AppContext)

    return (
        <>
            <Collapse ghost className="sidebar__listroom-collapse">

                <PanelStyle header={`Phòng chat (${rooms.length})`} key="1">
                    {
                        !rooms.length
                            ?
                            <p>Không có phòng nào</p>
                            :
                            rooms.map((room, index) =>
                                <p
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedRoomId(room.id)}
                                >
                                    {room.name}
                                </p>)
                    }
                </PanelStyle>

            </Collapse>
        </>
    )
}
