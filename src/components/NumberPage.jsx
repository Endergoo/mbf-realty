import React from 'react';

const NumberPage = ({ currentPage, totalPages, onPageChange }) => 
{
  return (
    <div style=
    {{
      display: 'flex', 
      gap: '10px', 
      justifyContent: 'center', 
      margin: '2rem 0'
    }}>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          style={{
            padding: '0.5rem 1rem',
            background: currentPage === i + 1 ? '#f0a500' : '#3a3a3a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default NumberPage;