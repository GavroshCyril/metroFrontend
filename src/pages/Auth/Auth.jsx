import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@mui/material";
import Axios from "axios";
import JwtDecode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { useTranslation } from "react-i18next";
import { update } from "../../store/userSlice";
import showPwdImg from "./showPassword.svg";
import hidePwdImg from "./hidePassword.svg";

const Search = () => {
  const handleButtonClick = () => {
    navigate("/register");
  };

  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userError, setUserError] = useState("");

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const [userNameDirty, setUserNameDirty] = useState(false);
  const [userPasswordDirty, setUserPasswordDirty] = useState(false);
  const [userNameError, setUserNameError] = useState(
    "Поле с логином не может быть пустым"
  );
  const [userPasswordError, setUserPasswordError] = useState(
    "Поле с паролем не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (userNameError || userPasswordError || !userName || !userPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, userPasswordError, userName, userPassword]);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(e.target.value)) {
      setUserNameError("Неккоректный логин");

      if (!e.target.value) {
        setUserNameError("Поле с логином не может быть пустым");
      } else {
        setUserNameError("");
      }
    } else {
      setUserNameError("");
    }
  };

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 15) {
      setUserPasswordError("Пароль должен быть длинее 2 и меньше 15 символов");
      if (!e.target.value) {
        setUserPasswordError("Поле с паролем не может быть пустым");
      } else {
        setUserPasswordError("");
      }
    } else {
      setUserPasswordError("");
    }
  };

  const bluerHandler = (e) => {
    switch (e.target.name) {
      case "userName":
        setUserNameDirty(true);
        break;
      case "userPassword":
        setUserPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3000/user/login", {
      name: userName,
      password: userPassword,
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data && response.data.accessToken;
          const refreshToken = response.data && response.data.refreshToken;
          const decoded = JwtDecode(token);
          const user = {
            id: decoded.id,
            name: decoded.name,
            role: decoded.role,
          };

          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch(update(user));

          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else if (response.status === 404) {
          setUserError("Пользователь не найден");
        } else {
          setUserError("Произошла ошибка во время входа");
          console.log("Something went wrong", response);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="auth-form">
      {userError && <div style={{ color: "red" }}>{userError}</div>}
      <Typography variant="h3" component="div">
        {t("admin.title")}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        className="auth-form__subtitle"
      >
        {t("admin.subTitle")}
      </Typography>
      <form className="auth-form__form">
        {userNameDirty && userNameError && !userName && (
          <div style={{ color: "red" }}>{userNameError}</div>
        )}
        <TextField
          onBlur={(e) => bluerHandler(e)}
          label={t("admin.login")}
          name="userName"
          fullWidth={true}
          size="small"
          margin="normal"
          className="auth-form__input"
          onChange={userNameHandler}
        />
        {userPasswordDirty && userPasswordError && !userPassword && (
          <div style={{ color: "red" }}>{userPasswordError}</div>
        )}
        <div className="pwd-container">
          <TextField
            onBlur={(e) => bluerHandler(e)}
            label={t("admin.password")}
            name="userPassword"
            fullWidth={true}
            size="small"
            margin="normal"
            type={isRevealPwd ? "text" : "password"}
            className="auth-form__input"
            onChange={userPasswordHandler}
          />
          <img
            title={isRevealPwd ? "Скрыть пароль" : "Показать пароль"}
            src={isRevealPwd ? hidePwdImg : showPwdImg}
            onClick={() => setIsRevealPwd((prevState) => !prevState)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 3,
          }}
          onClick={login}
          disabled={!formValid}
        >
          {t("admin.logIn")}
        </Button>
        <small>
          {t("admin.noAccount")}{" "}
          <Link onClick={handleButtonClick} to="/register">
            {" "}
            {t("register.logIn")}
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Search;
