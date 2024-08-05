import { Octokit } from 'octokit';

// Inicialize o Octokit
const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN
});

// Informações do repositório
const owner = 'joanmdrs';
const repo = 'sigcli';

// Informações do usuário
const name = 'Joan Medeiros';
const email = 'joanmedeiros2018@gmail.com';

export const criarDocumento = async (file_path, file_content, commit_message) => {
  try {
    const contentBase64 = btoa(file_content);
    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: file_path,
      message: commit_message,
      committer: {
        name,
        email,
      },
      content: contentBase64,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response;
  } catch (error) {
    console.error('Falha ao escrever o conteúdo do arquivo:', error);
    return { error: 'Falha ao escrever o conteúdo do arquivo' };
  }
};

export const buscarDocumentos = async (file_path) => {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: file_path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return response;
  } catch (error) {
    console.error('Falha ao buscar os documentos do projeto:', error);
    return { error: 'Falha ao buscar os documentos do projeto' };
  }
};
