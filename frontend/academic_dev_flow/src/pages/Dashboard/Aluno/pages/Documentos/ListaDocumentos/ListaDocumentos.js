// import { Tabs } from "antd";
// import React, { useEffect, useState } from "react";
// import { octokit } from "../../../../../../api/apiGitHubService";
// import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// const ListaDocumentos = () => {
//     useEffect(() => {
//         const fetchData = async () => {
//             await handleGetDocumentos();
//         };

//         fetchData();
//     }, []);

//     const [documentos, setDocumentos] = useState([]);

//     const handleGetDocumentos = async () => {
//         try {
//             const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//                 owner: 'joanmdrs',
//                 repo: 'sigcli',
//                 path: 'docs',
//             });

//             if (response.status === 200) {
//                 const promises = response.data.map(async (item) => {
//                     const response1 = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
//                         owner: 'joanmdrs',
//                         repo: 'sigcli',
//                         path: item.path,
//                     });

//                     const decodedContent = decodeURIComponent(escape(atob(response1.data.content)));
//                     console.log("Documento: ", decodedContent);

//                     return { path: item.path, content: decodedContent }; // Retorna o conteúdo do documento
//                 });

//                 // Aguarde a resolução de todas as promessas antes de prosseguir
//                 const results = await Promise.all(promises);
//                 setDocumentos(results);
//             }
//         } catch (error) {
//             console.error("Erro na solicitação:", error);
//         }
//     };

//     return (
//         <div>
//             {/* Se quiser renderizar a lista de documentos */}
//             <ul>
//                 {documentos.map((doc, index) => (
//                     <li key={index}>
//                         <strong>{doc.path}</strong>: 
//                         <Markdown remarkPlugins={[remarkGfm]}>{doc.content}</Markdown>
//                     </li>
//                 ))}
//             </ul>

            
//         </div>
//     );
// };

// export default ListaDocumentos;
