import React from "react";
import { MembroProvider } from "../../context/MembroContexto";
import Equipe from "./Equipe";


const ScreenEquipe = () => {
    // const breadcrumbRoutes = [
    //     { title: 'Home', path: `/${grupo}/home` },
    //     { title: 'Membros', path: `/${grupo}/membros` },
    //     { title: 'Equipe', path: ``}
    // ];
    return (
        <React.Fragment>
            <MembroProvider>
                <Equipe />
            </MembroProvider>
                                           
                
        </React.Fragment>   
    )
}

export default ScreenEquipe