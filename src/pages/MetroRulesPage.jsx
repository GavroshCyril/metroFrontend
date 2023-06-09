import React, { useState } from "react";
import { Typography, Button, Container } from "@mui/material";
import TicketEvolution from "./Payment/TicketEvolution";

const MetroGamePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Время работы Минского метрополитена",
      options: ["с 5:30 до 1:00", "с 6:00 до 23:30", "круглосуточно"],
      correctAnswer: 0,
    },
    {
      question:
        "Какая последовательность входа (выхода) пассажиров к поездам метрополитена является правильной?",
      options: [
        "Вход через все двери, выход через все двери",
        "Вход через одну дверь, выход через другую дверь",
        "Вход и выход через любые двери",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Какой порядок входа и выхода пассажиров из электропоезда является правильным?",
      options: [
        "Вход и выход пассажиров происходит одновременно",
        "Вход и выход пассажиров происходит через разные двери",
        "Вход и выход пассажиров происходит по очереди",
      ],
      correctAnswer: 2,
    },
    {
      question: "Какие предметы пассажирам не рекомендуется оставлять в метро?",
      options: ["Зонты", "Пакеты с продуктами", "Личные документы"],
      correctAnswer: 2,
    },
    // Добавьте остальные вопросы в аналогичном формате
    // ...
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Игра по правилам метрополитена
      </Typography>
      <TicketEvolution />

      {!showResult && (
        <div>
          <Typography variant="h6" gutterBottom>
            Вопрос {currentQuestion + 1}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {questions[currentQuestion].question}
          </Typography>

          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleAnswer(index)}
                style={{ marginBottom: "10px" }}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div>
          <Typography variant="h6" gutterBottom>
            Результаты
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ваш счет: {score}/{questions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={restartGame}
          >
            Начать заново
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MetroGamePage;
