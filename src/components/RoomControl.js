import React from 'react';

const RoomControl = ({ rooms, onBack, onToggleStatus, onChangeTemperature, onShowStatus }) => {
  return (
    <div>
      <button className="back-button" onClick={onBack}>
        Voltar
      </button>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.name} className="room">
            <h2>{room.name}</h2>
            <div className="status">
  <button
    className={`status-button ${room.isOn ? 'on' : 'off'}`}
       onClick={() => onToggleStatus(room)}
            >
            {room.isOn ? 'Ligado' : 'Desligado'}
            </button>
            </div>

            <div className="info">Temperatura: {room.temp}°C</div>
            <div className="info">Última mudança: {room.lastStatusChange || '-'}</div>
            <div className="temperature-control">
              <button onClick={() => onChangeTemperature(room, -1)}>-</button>
              <button onClick={() => onChangeTemperature(room, 1)}>+</button>
            </div>
            <button className="status-details-button" onClick={() => onShowStatus(room)}>
              Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomControl;
