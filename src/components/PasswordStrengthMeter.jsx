import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    if (testResult.score === 0) {
      return "Пароль слишком простой";
    } else if (testResult.score === 1) {
      return "Пароль должен содержать, как минимум, 6 символов";
    } else if (testResult.score === 2) {
      return "Пароль недостаточно надежный";
    } else if (testResult.score === 3) {
      return "Надежный пароль";
    } else if (testResult.score === 4) {
      return "Отличный пароль";
    } else {
      return "";
    }
  };

  const funcProgressColor = () => {
    if (testResult.score === 0) {
      return "#828282";
    } else if (testResult.score === 1) {
      return "#EA1111";
    } else if (testResult.score === 2) {
      return "#FFAD00";
    } else if (testResult.score === 3) {
      return "#9bc158";
    } else if (testResult.score === 4) {
      return "#00b500";
    } else {
      return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const hasUppercaseLetter = /[A-Z]/;

  const isSpecialCharacterPresent = hasSpecialCharacter.test(password);
  const isUppercaseLetterPresent = hasUppercaseLetter.test(password);

  return (
    <>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
      {isSpecialCharacterPresent && (
        <p style={{ color: funcProgressColor() }}>
          Пароль содержит специальные символы
        </p>
      )}
      {isUppercaseLetterPresent && (
        <p style={{ color: funcProgressColor() }}>
          Пароль содержит заглавные буквы
        </p>
      )}
    </>
  );
};

export default PasswordStrengthMeter;
