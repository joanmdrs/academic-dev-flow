import { NotificationManager } from "react-notifications";

export const recarregarPagina = () => {
    setTimeout(() => {
        document.location.reload();
      }, 1000);
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
  return formattedDate;
};

export const converterData = (dataString) => {
  const partes = dataString.split('/');
  
  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];
  
  const dataFormatada = `${ano}-${mes}-${dia}`;
  return dataFormatada
  
}

export const handleResponse = (response, successMessage) => {
  if (response.status === 200 || response.status === 204) {
      NotificationManager.success(successMessage);
      return response;
  } else {
      throw new Error("Unexpected response status: " + response.status);
  }
};

export const handleError = (error, errorMessage) => {
  console.log(error);
  NotificationManager.error(errorMessage);
  return { error: errorMessage };
};