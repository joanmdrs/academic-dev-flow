import React from 'react'
import { Result } from 'antd';

const GerenciarRelatorios = () => {

    return (
        <div style={{
            display: 'flex', 
            height: '100%', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center'
        }}>
            <Result
                status="warning"
                title="Esta seção está ainda está em desenvolvimento !" />
        </div>

    )

}

export default GerenciarRelatorios