import { NotificationManager } from "react-notifications";

export const recarregarPagina = () => {
    setTimeout(() => {
        document.location.reload();
      }, 1000);
}

export const formatDate = (dateString) => {
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${months[monthIndex]}. ${year}`;

  return formattedDate;
};

export const formatDateTime = (dateString) => {
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Extraindo horas e minutos
  const hours = date.getHours().toString().padStart(2, '0'); // Adiciona o zero à esquerda, se necessário
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Adiciona o zero à esquerda, se necessário

  const formattedDate = `${day} ${months[monthIndex]}. ${year} às ${hours}:${minutes}`;

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

export const getRandomColor = () => {
  const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const limitarCaracteres = (texto, limite) => {

  if (texto === null) {
    return ""
  }

  if (texto.length <= limite) {
      return texto;
  } else {
      return texto.slice(0, limite) + "...";
  }
}

export const formatarTempo = (segundos) => {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;
  
  const horasFormatadas = horas.toString().padStart(2, '0');
  
  const minutosFormatados = minutos.toString().padStart(2, '0');
  
  const segundosFormatados = segundosRestantes.toString().padStart(2, '0');
  
  return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
};


export const transformCapitalize = (str) => {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
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
  if (response.status === 204 || response.status === 200){
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

export const getDataHoraNow = () => {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const agora = new Date();
    const mes = meses[agora.getMonth()];
    const dia = String(agora.getDate()).padStart(2, '0');
    const ano = agora.getFullYear();
    
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    return `${mes}, ${dia}, ${ano} | ${horas}:${minutos}`;

}