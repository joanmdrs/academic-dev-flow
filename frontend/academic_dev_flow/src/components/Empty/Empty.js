import { Empty } from "antd";
import React from "react";

const RenderEmpty = ({title}) => {
    return (
        <Empty
            description={title}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            style={{
                display: 'flex',
                width: "100%",
                height: "100%",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        />
    )
}

export default RenderEmpty