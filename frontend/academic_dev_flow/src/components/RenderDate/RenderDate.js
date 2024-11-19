import React from "react";
import { FaRegClock } from "react-icons/fa";
import { formatDate } from "../../services/utils";

const RenderDate = ({dateType, dateValue}) => {

    return (
        <span style={{
            padding: '7px',
            borderRadius: '5px',
            fontSize: '10px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            gap: '5px',
            backgroundColor: `${dateType === 'inicio' ? "#01DF74" : "#FF0000"}`,
            color: `${dateType === 'inicio' ? "#FFFFFF" : "#FFFFFF"}`
        }}> 
            <FaRegClock /> {formatDate(dateValue)}
        </span>
    )
}

export default RenderDate