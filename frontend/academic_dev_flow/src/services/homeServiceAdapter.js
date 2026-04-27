import {
    listarTarefas,
    listarTarefasDosProjetosDoMembro
} from "./tarefaService";

import {
    listarArtefatos,
    listarArtefatosDosProjetosDoMembro
} from "./artefatoService";

import { listarProjetos } from "./projetoService";
import { buscarProjetosDoMembro } from "./membroProjetoService";

export const homeServiceAdapter = {
    admin: {
        tarefas: () => listarTarefas(),
        artefatos: () => listarArtefatos(),
        projetos: () => listarProjetos(),
    },

    aluno: {
        tarefas: (userId) => listarTarefasDosProjetosDoMembro(userId),
        artefatos: (userId) => listarArtefatosDosProjetosDoMembro(userId),
        projetos: (userId) => buscarProjetosDoMembro(userId),
    },

    professor: {
        tarefas: (userId) => listarTarefasDosProjetosDoMembro(userId),
        artefatos: (userId) => listarArtefatosDosProjetosDoMembro(userId),
        projetos: (userId) => buscarProjetosDoMembro(userId),
    }
};