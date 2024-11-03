import React from "react";
import { Row, Col, Empty } from "antd";
import ItemGridArtefato from "./ItemGridArtefato/ItemGridArtefato";

const GridArtefatos = ({data, onUpdate, onDelete}) => {

    return (
        <div>

            {
                data.length !== 0 ? (
                    <div style={{display: 'flex', gap: '20px', padding: '20px'}}> 
                        {data.map((item, index) => (
                            <ItemGridArtefato item={item} onUpdate={onUpdate} onDelete={onDelete} />
                        ))} 
                    </div>
                   
                                           
                ) : (
                    <Empty
                        description="Nenhum artefato para exibir"
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        style={{
                            display: 'flex',
                            width: "100%",
                            height: "100%",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                    </Empty>
                )
            }
        </div>
    );
};

export default GridArtefatos;
