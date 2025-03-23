import { Flex } from "antd";
import React from "react";

const SectionFilters = ({children}) => {

    return (
        <div style={{
            padding: '20px',
            borderBottom: '1px solid #ddd'
        }}> 
        
            <Flex gap="middle"> 
                {children}
            </Flex>
        </div>
        
    )
}

export default SectionFilters