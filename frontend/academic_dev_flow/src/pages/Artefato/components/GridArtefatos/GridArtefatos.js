import React from "react";
import ItemGridArtefato from "./ItemGridArtefato/ItemGridArtefato";
import RenderEmpty from "../../../../components/Empty/Empty";

const GridArtefatos = ({data, onUpdate, onDelete, onShowComments}) => {

    return (
        <div>

            {
                data.length !== 0 ? (
                    <div style={{display: 'flex', gap: '20px', padding: '20px'}}> 
                        {data.map((item, index) => (
                            <ItemGridArtefato 
                                item={item} 
                                onUpdate={onUpdate} 
                                onDelete={onDelete} 
                                onShowComments={onShowComments} 
                            />
                        ))} 
                    </div>
                   
                                           
                ) : (
                    <RenderEmpty title="Nenhum artefato para exibir " />
                )
            }
        </div>
    );
};

export default GridArtefatos;
