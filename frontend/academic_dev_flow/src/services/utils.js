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

