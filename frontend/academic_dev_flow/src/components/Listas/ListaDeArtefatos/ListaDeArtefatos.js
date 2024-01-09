import { Table } from "antd";
import React, { useState } from "react";

const ListaDeArtefatos = ({colunas}) => {

    const [data, setData] = useState([])

    return (
        <div> 
              {data.length > 0 ? (
                <>
                <Table dataSource={data} columns={colunas} rowKey="id"/>
              </>
      
            ) : null}
        </div>
    )

}