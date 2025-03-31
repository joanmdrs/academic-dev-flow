import RenderOption from "../components/RenderOption/RenderOption";

export const optionsStatusProjetos = [
    {
        value: 'planejamento',
        name: 'Em planejamento',
        label: RenderOption('Em Planejamento', '#6f42c1'),
        color: '#6f42c1'
    },
    {
        value: 'criado', 
        name: 'Criado',
        label: RenderOption('Criado', '#007bff'),
        color: '#007bff' // Azul
    },
    {
        value: 'andamento',
        name: 'Andamento',
        label: RenderOption('Andamento', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'atrasado',
        name: 'Atrasado',
        label: RenderOption('Atrasado', '#dc3545'),
        color: '#dc3545' // Vermelho
    },
    {
        value: 'concluido', 
        name: 'Concluído',
        label: RenderOption('Concluído', '#28a745'),
        color: '#28a745' // Verde
    },
    {
        value: 'cancelado',
        name: 'Cancelado',
        label: RenderOption('Cancelado', '#fd7e14'),
        color: '#fd7e14' // Laranja
    }
];

export const optionsStatusTarefas = [
    {
        value: 'pendente', 
        name: 'Pendente',
        label: RenderOption('Pendente', '#007bff'),
        color: '#007bff' // Azul
    },
    {
        value: 'planejamento',
        name: 'Em planejamento',
        label: RenderOption('Em Planejamento', '#6f42c1'),
        color: '#6f42c1'
    },
    {
        value: 'andamento',
        name: 'Andamento',
        label: RenderOption('Andamento', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'concluida', 
        name: 'Concluída',
        label: RenderOption('Concluída', '#28a745'),
        color: '#28a745' // Verde
    },
    {
        value: 'atrasada',
        name: 'Atrasada',
        label: RenderOption('Atrasada', '#dc3545'),
        color: '#dc3545' // Vermelho
    },
    {
        value: 'bloqueada',
        name: 'Bloqueada',
        label: RenderOption('Bloqueada', '#6f42c1'),
        color: '#6f42c1' // Roxo
    },
    {
        value: 'cancelada',
        name: 'Cancelada',
        label: RenderOption('Cancelada', '#fd7e14'),
        color: '#fd7e14' // Laranja
    }
];

export const optionsStatusIteracoes = [
    {
        value: 'pendente', 
        name: 'Pendente',
        label: RenderOption('Pendente', '#007bff'),
        color: '#007bff' // Azul
    },
    {
        value: 'planejamento',
        name: 'Em planejamento',
        label: RenderOption('Em Planejamento', '#6f42c1'),
        color: '#6f42c1'
    },
    {
        value: 'andamento',
        name: 'Andamento',
        label: RenderOption('Andamento', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'bloqueada',
        name: 'Bloqueada',
        label: RenderOption('Bloqueada', '#dc3545'),
        color: '#dc3545' // Vermelho
    },
    {
        value: 'concluida',
        name: 'Concluída',
        label: RenderOption('Concluída', '#28a745'),
        color: '#28a745' // Verde
    },
    {
        value: 'cancelada',
        name: 'Cancelada',
        label: RenderOption('Cancelada', '#fd7e14'),
        color: '#fd7e14' // Laranja
    }
];

export const optionsStatusReleases = [
    {
        value: 'pendente', 
        name: 'Pendente',
        label: RenderOption('Pendente', '#007bff'),
        color: '#007bff' // Azul
    },
    {
        value: 'planejamento',
        name: 'Em planejamento',
        label: RenderOption('Em Planejamento', '#6f42c1'),
        color: '#6f42c1'
    },
    {
        value: 'andamento',
        name: 'Andamento',
        label: RenderOption('Andamento', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'bloqueada',
        name: 'Bloqueada',
        label: RenderOption('Bloqueada', '#dc3545'),
        color: '#dc3545' // Vermelho
    },
    {
        value: 'concluida',
        name: 'Concluída',
        label: RenderOption('Concluída', '#28a745'),
        color: '#28a745' // Verde
    },
    {
        value: 'cancelada',
        name: 'Cancelada',
        label: RenderOption('Cancelada', '#fd7e14'),
        color: '#fd7e14' // Laranja
    }
];

export const optionsStatusArtefatos = [
    {
        value: 'pendente',
        name: 'Pendente',
        label: RenderOption('Pendente', '#007bff'),
        color: '#007bff' // Azul
    },
    {
        value: 'rascunho',
        name: 'Em rascunho',
        label: RenderOption('Em rascunho', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'revisao',
        name: 'Em revisão',
        label: RenderOption('Em revisão', '#6f42c1'),
        color: '#6f42c1' // Roxo
    },
    {
        value: 'aprovado',
        name: 'Aprovado',
        label: RenderOption('Aprovado', '#28a745'),
        color: '#28a745' // Verde
    },
    {
        value: 'finalizado',
        name: 'Finalizado',
        label: RenderOption('Finalizado', '#fd7e14'),
        color: '#fd7e14' // Laranja
    },
    {
        value: 'cancelado',
        name: 'Cancelado',
        label: RenderOption('Cancelado', '#fd7e14'),
        color: '#fd7e14' // Laranja
    }
];

export const optionsStatusFeedback = [
    {
        value: 'pendente',
        name: 'Pendente',
        label: RenderOption('Pendente', '#dc3545'),
        color: '#dc3545' // Vermelho
    },
    {
        value: 'em_analise',
        name: 'Em Análise',
        label: RenderOption('Em Análise', '#ffc107'),
        color: '#ffc107' // Amarelo
    },
    {
        value: 'resolvido',
        name: 'Resolvido',
        label: RenderOption('Resolvido', '#28a745'),
        color: '#28a745' // Verde
    }
]

export const optionsTiposFeedbacks = [
    { 
        value: 'sugestao', 
        name: 'Sugestão', 
        label: RenderOption('Sugestão', '#007bff'), // Azul
        color: '#007bff' 
    },
    { 
        value: 'reclamacao', 
        name: 'Reclamação', 
        label: RenderOption('Reclamação', '#dc3545'), // Vermelho
        color: '#dc3545' 
    },
    { 
        value: 'bug', 
        name: 'Bug', 
        label: RenderOption('Bug', '#ffc107'), // Amarelo
        color: '#ffc107' 
    },
    { 
        value: 'nova_funcionalidade', 
        name: 'Nova Funcionalidade', 
        label: RenderOption('Nova Funcionalidade', '#17a2b8'), // Azul claro
        color: '#17a2b8' 
    },
    { 
        value: 'melhoria_funcionalidade', 
        name: 'Melhoria de Funcionalidade', 
        label: RenderOption('Melhoria de Funcionalidade', '#6610f2'), // Roxo
        color: '#6610f2' 
    },
    { 
        value: 'experiencia_usuario', 
        name: 'Experiência do Usuário', 
        label: RenderOption('Experiência do Usuário', '#6f42c1'), // Roxo escuro
        color: '#6f42c1' 
    },
    { 
        value: 'duvida_uso', 
        name: 'Dúvida sobre o uso', 
        label: RenderOption('Dúvida sobre o uso', '#20c997'), // Verde água
        color: '#20c997' 
    },
    { 
        value: 'problema_acessibilidade', 
        name: 'Problemas de Acessibilidade', 
        label: RenderOption('Problemas de Acessibilidade', '#fd7e14'), // Laranja
        color: '#fd7e14' 
    }
];




