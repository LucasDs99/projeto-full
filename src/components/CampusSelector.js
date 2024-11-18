import React from 'react';

const CampusSelector = ({ onSelect }) => {
  return (
    <div className="blocos">
      {['Pituaçu', 'Federação'].map((campus) => (
        <div key={campus} className="bloco" onClick={() => onSelect(campus)}>
          <h2>Campus {campus}</h2>
        </div>
      ))}
    </div>
  );
};

export default CampusSelector;
