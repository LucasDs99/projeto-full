import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StatusModal = ({ data, onClose }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data) {
      // Criar o gráfico apenas quando o modal abrir
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.temperatureHistory.map((d) => d.time),
          datasets: [
            {
              label: 'Temperatura (°C)',
              data: data.temperatureHistory.map((d) => d.temperature),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: 18,
              suggestedMax: 30,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Histórico de Temperatura (últimas 24 horas)',
            },
          },
        },
      });
    }

    return () => {
      // Certifique-se de destruir o gráfico ao desmontar o componente
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="modal" onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Status da {data.roomName}</h2>
        <p>Temperatura ambiente: {data.ambientTemp}°C</p>
        <p>Umidade: {data.humidity}%</p>
        <p>Último movimento detectado: {data.lastMovement}</p>
        <p>Última mudança de status: {data.lastStatusChange}</p>
        <canvas id="temperatureChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default StatusModal;
