import React, { useState } from "react";

const TicketEvolution = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      image: "https://minsk-metro.net/i/talon/1998.jpg",
      year: 1998,
      description: "Льготный талон",
    },
    {
      image: "https://minsk-metro.net/i/talon/1999.jpg",
      year: 2020,
      description: "Талончик Минского метрополитена 2020 года",
    },
    // Добавьте остальные талончики
  ];

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div>
      <h2>Эволюция талончиков Минского метрополитена</h2>
      <div className="ticket-list">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className={`ticket ${selectedTicket === ticket ? "selected" : ""}`}
            onClick={() => handleTicketClick(ticket)}
          >
            <img src={ticket.image} alt={`Талончик ${index + 1}`} />
          </div>
        ))}
      </div>
      {selectedTicket && (
        <div className="ticket-details">
          <h3>Детали талончика</h3>
          <img src={selectedTicket.image} alt="Выбранный талончик" />
          <p>Год: {selectedTicket.year}</p>
          <p>Описание: {selectedTicket.description}</p>
        </div>
      )}
    </div>
  );
};

export default TicketEvolution;
