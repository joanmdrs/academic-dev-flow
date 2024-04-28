import { NotificationManager } from "react-notifications";
import {Modal} from 'antd'

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

export const handleSuccess = (response, successMessage) => {
  if (response.status === 200 || response.status === 204 || response.status === 201) {
      NotificationManager.success(successMessage);
      return response;
  } else {
      throw new Error("Unexpected response status: " + response.status);
  }
};

export const handleInfo = (response, infoMessage) => {
  if (response.status === 204){
    NotificationManager.info(infoMessage)
    return response;
  } else {
    throw new Error("Unexpected response status: " + response.status);
}
}

export const handleError = (error, errorMessage) => {
  console.log(error);
  NotificationManager.error(errorMessage);
  return { error: errorMessage };
};

export const gerarCorAleatoria = () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor
};

export const lightenDarkenColor = (col, amt) => {
  var usePound = false;
  if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
  }
  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  var b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  var g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}