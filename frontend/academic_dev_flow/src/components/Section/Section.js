import React from "react";

const Section = ({children}) => {

    return (
        <div style={{
            height: '100%',
            backgroundColor: "#FAFAFA"
        }}>
            {children}
        </div>
    )
}

export default Section