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
            gap: '5px',
            backgroundColor: `${dateType === 'inicio' ? "#CEE3F6" : "#F6E3CE"}`,
            color: `${dateType === 'inicio' ? "#0B4C5F" : "#FF8000"}`
        }}> 
            <FaRegClock /> {formatDate(dateValue)}
        </span>
    )
}

export default RenderDate