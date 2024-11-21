import React from "react";
import { convertHexToRgba } from "../../services/utils";

const RenderTag = ({item}) => {
    return (
        <span
            style={{
                backgroundColor: `${convertHexToRgba(item.cor)}`,
                color: `${item.cor}`,
                padding: '10px',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '12px',

            }}> {item.nome}
        </span>
    )
}

export default RenderTag