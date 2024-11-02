import { Spin } from "antd";
import React from "react";

const StyleSpin = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 9999, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
};

const SpinLoading = () => {
    return (
        <div style={StyleSpin}>
            <Spin size="large" />
        </div>
    )
}

export default SpinLoading