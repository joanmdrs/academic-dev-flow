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