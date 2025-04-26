import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import ScreenHomeAdmin from "../../pages/Home/Admin";
import ScreenPerfilMembro from "../../pages/Membro/screens/PerfilMembro";
import ScreenAdminProjetos from "../../pages/Projeto/admin/AdminProjetos";
import ScreenGerenciarFluxos from "../../pages/Fluxo";
import ScreenGerenciarEtapas from "../../pages/Etapa/screens/GerenciarEtapas";
import ScreenGerenciarMembros from "../../pages/Membro/screens/GerenciarMembros";
import ScreenVincularMembroAoProjeto from "../../pages/Membro/screens/VincularMembroAoProjeto";
import ScreenGerenciarCategoriaFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarCategoriaFuncaoMembro";
import ScreenGerenciarFuncaoMembro from "../../pages/FuncaoMembro/screens/GerenciarFuncaoMembro";
import ScreenAdminArtefatos from "../../pages/Artefato/admin/AdminArtefatos";
import ScreenGerenciarTarefas from "../../pages/Tarefa/screens/GerenciarTarefas";
import ScreenGerenciarCategoriaTarefa from "../../pages/CategoriaTarefa";
import ScreenGerenciarTags from "../../pages/Tag";
import ScreenAdminReleases from "../../pages/Release/admin/AdminReleases";
import ScreenAdminIteracoes from "../../pages/Iteracao/admin/AdminIteracoes";
import ScreenFeedbacks from "../../pages/Feedback/screens";
import ScreenAdminIssues from "../../pages/GitHub/admin/AdminIssues";
import ScreenAdminContents from "../../pages/GitHub/admin/AdminContents";
import ScreenAdminCommits from "../../pages/GitHub/admin/AdminCommits";
import ScreenGerenciarRelatorios from "../../pages/Relatorio/screens/GerenciarRelatorios";

function AdminRoutesDefinition() {
    return (
        <Switch>
            {/* Página de Home */}
            <Route path="home" element={<ScreenHomeAdmin />} exact />
            <Route path="perfil" element={<ScreenPerfilMembro grupo="admin" />} exact/>

            {/* Menu Item Projetos */}
            <Route path="projetos" element={<ScreenAdminProjetos />} exact />

            {/* Menu Item Fluxos */}
            <Route path="fluxos/gerenciar" element={<ScreenGerenciarFluxos grupo="admin" />} exact />
            <Route path="fluxos/etapas" element={<ScreenGerenciarEtapas  grupo="admin" />} exact />

            {/* Menu Item Membros */}
            <Route path="membros/gerenciar" element={<ScreenGerenciarMembros grupo="admin" />} exact />
            <Route path="membros/vincular-projeto" element={<ScreenVincularMembroAoProjeto />} exact />
            <Route path="membros/funcoes/gerenciar-categorias" element={<ScreenGerenciarCategoriaFuncaoMembro grupo="admin" /> } exact />
            <Route path="membros/funcoes/gerenciar-funcoes" element={<ScreenGerenciarFuncaoMembro />} exact />

            {/* Menu Item Artefatos */}
            <Route path="artefatos/gerenciar" element={<ScreenAdminArtefatos />} exact />

            {/* Menu Item Tarefas */}
            <Route path="tarefas/gerenciar" element={<ScreenGerenciarTarefas />} exact />

            {/* Menu Item Categorias de Tarefa */}
            <Route path="tarefas/gerenciar-categorias" element={<ScreenGerenciarCategoriaTarefa grupo="admin" />} exact />
            <Route path="tarefas/tags" element={<ScreenGerenciarTags grupo="admin" />} />

            {/* Menu Item Iterações */}
            <Route path="cronograma/lancamentos" element={<ScreenAdminReleases />} exact />
            <Route path="cronograma/iteracoes" element={<ScreenAdminIteracoes />} exact />

            <Route path="feedbacks" element={<ScreenFeedbacks grupo="admin" />} exact />

            <Route path="github-integration/issues" element={<ScreenAdminIssues />} exact />
            <Route path="github-integration/contents" element={<ScreenAdminContents />} exact />
            <Route path="github-integration/commits" element={<ScreenAdminCommits />} exact />

            <Route path="relatorios" element={<ScreenGerenciarRelatorios  grupo="admin" />} />
        </Switch>
    );
}

export default AdminRoutesDefinition;