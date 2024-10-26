import React from "react";
import { Row, Col, Empty } from "antd";
import ItemGridArtefato from "./ItemGridArtefato/ItemGridArtefato";

const GridArtefatos = ({artefatos, onUpdate, onDelete}) => {

    return (
        <div style={{ padding: "20px" }}>

            {
                artefatos.length !== 0 ? (
                    <Row gutter={[16, 16]}>
                        {artefatos.map((artefato, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                            <ItemGridArtefato artefato={artefato} onUpdate={onUpdate} onDelete={onDelete} />
                        </Col>
                        ))}
                    </Row>
                    
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
