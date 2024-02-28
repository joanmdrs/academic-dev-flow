import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 40,
                    }}
                    spin
                />
            }
        />
    </div>
    )
}

export default Loading