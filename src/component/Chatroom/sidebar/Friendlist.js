import React from 'react'

import { Collapse } from 'antd';
import styled from 'styled-components'


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
            font-size: 18px
        }
    }
`;
export default function Friendlist() {
    return (
        <div>
            <Collapse ghost className="sidebar__listroom-collapse">

                <PanelStyle header={`Danh sách bạn bè `} key="1">
                    <p>Hello</p>
                </PanelStyle>

            </Collapse>
        </div>
    )
}
