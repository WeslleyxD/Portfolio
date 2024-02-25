import React, { useState } from 'react';

export default function Pagination ({ data, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular o índice inicial e final dos itens na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Função para mudar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Verificar se há uma página anterior ou seguinte
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div>
      <div>
        {/* Exibir os itens da página atual */}
        {currentItems.map((item, index) => (
          <div key={index}>{item.description}</div>
        ))}
      </div>

      <div>
        {/* Botão "Anterior" */}
        <button
          disabled={!hasPreviousPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>

        {/* Número da página atual */}
        <span>Página {currentPage}</span>

        {/* Botão "Próximo" */}
        <button
          disabled={!hasNextPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};