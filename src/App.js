import React, { useState } from 'react';
import CampusSelector from './components/CampusSelector';
import BlocoSelector from './components/BlocoSelector';
import RoomControl from './components/RoomControl';
import StatusModal from './components/StatusModal';
import './App.css';

const blocoRooms = {
  A: [
    { name: "Sala 100", temp: 24, lastStatusChange: null },
    { name: "Sala 101", temp: 22, lastStatusChange: null },
    { name: "Sala 102", temp: 24, lastStatusChange: null },
  ],
  B: [
    { name: "Sala 200", temp: 23, lastStatusChange: null },
    { name: "Sala 201", temp: 22, lastStatusChange: null },
    { name: "Sala 202", temp: 24, lastStatusChange: null },
  ],
  C: [
    { name: "Sala 300", temp: 23, lastStatusChange: null },
    { name: "Sala 301", temp: 22, lastStatusChange: null },
    { name: "Sala 302", temp: 24, lastStatusChange: null },
  ],
};

const App = () => {
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedBloco, setSelectedBloco] = useState('');
  const [rooms, setRooms] = useState([]);
  const [modalData, setModalData] = useState(null);

  const selectCampus = (campus) => {
    setSelectedCampus(campus);
    setSelectedBloco('');
    setRooms([]);
  };

  const selectBloco = (bloco) => {
    setSelectedBloco(bloco);
    setRooms(blocoRooms[bloco]);
  };

  const toggleStatus = (room) => {
    const updatedRooms = rooms.map((r) =>
      r.name === room.name
        ? {
            ...r,
            lastStatusChange: new Date().toLocaleTimeString(), // Atualiza o horário
            isOn: !r.isOn, // Alterna o estado entre ligado/desligado
          }
        : r
    );
    setRooms(updatedRooms);
  };
  
  
  

  const changeTemperature = (room, change) => {
    const updatedRooms = rooms.map((r) =>
      r.name === room.name ? { ...r, temp: Math.max(16, Math.min(30, r.temp + change)) } : r
    );
    setRooms(updatedRooms);
  };

  const showStatus = (room) => {
    const temperatureHistory = Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() - i * 3600000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      temperature: Math.floor(Math.random() * 9) + 20,
    }));

    setModalData({
      roomName: room.name,
      ambientTemp: Math.floor(Math.random() * 11) + 20,
      humidity: Math.floor(Math.random() * 41) + 30,
      lastMovement: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      lastStatusChange: room.lastStatusChange || 'Não registrado',
      temperatureHistory,
    });
  };

  const closeModal = () => setModalData(null);

  return (
    <div className="container">
      <h1>
        Controle de Ar Condicionado da Universidade
        {selectedCampus && ` - ${selectedCampus}`}
        {selectedBloco && ` - Bloco ${selectedBloco}`}
      </h1>
      {!selectedCampus && <CampusSelector onSelect={selectCampus} />}
      {selectedCampus && !selectedBloco && (
        <BlocoSelector onSelect={selectBloco} onBack={() => setSelectedCampus('')} />
      )}
      {selectedBloco && (
        <RoomControl
          rooms={rooms}
          onBack={() => setSelectedBloco('')}
          onToggleStatus={toggleStatus}
          onChangeTemperature={changeTemperature}
          onShowStatus={showStatus}
        />
      )}
      {modalData && <StatusModal data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default App;
