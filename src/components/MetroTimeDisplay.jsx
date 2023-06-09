import React, { useState, useEffect } from "react";

const MetroTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Проверка на время работы метро
      if (
        currentHour >= 5 &&
        (currentHour < 24 || (currentHour === 0 && currentMinute <= 30))
      ) {
        const formattedTime = `${currentHour
          .toString()
          .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
        setCurrentTime(formattedTime);
      } else {
        setCurrentTime("Метрополитен закрыт");
      }
    };

    const intervalId = setInterval(updateTime, 1000); // Обновляем время каждую секунду

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
  }, []);

  return (
    <div>
      <h2>Время работы минского метрополитена:</h2>
      <p>{currentTime}</p>
    </div>
  );
};

export default MetroTimeDisplay;
