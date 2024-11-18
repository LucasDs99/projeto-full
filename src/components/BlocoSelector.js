import React from 'react';

const BlocoSelector = ({ onSelect, onBack }) => {
  return (
    <div className="blocos">
      <button className="back-button" onClick={onBack}>
        Voltar
      </button>
      {['A', 'B', 'C'].map((bloco) => (
        <div key={bloco} className="bloco" onClick={() => onSelect(bloco)}>
          <h2>Bloco {bloco}</h2>
        </div>
      ))}
    </div>
  );
};

export default BlocoSelector;
