import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Rating.css";
import { FaStar } from "react-icons/fa";
import Axios from "axios";
import {
  Stack,
  Button,
  Box,
  TextField,
  Typography,
  Rating,
  Alert,
  Snackbar,
} from "@mui/material";
import { selectUserState } from "../../store/userSlice";
import { useReviews } from "../../hooks/useReviews";
import { useTranslation } from "react-i18next";

const colors = {
  orange: "rgb(250, 175, 0)",
  grey: "#a9a9a9",
};

function BasicRating() {
  const [t] = useTranslation();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const userState = useSelector(selectUserState);
  const onReviews = useReviews();

  const addReview = () => {
    Axios.post("http://localhost:3000/reviews", {
      userId: userState.id.toString(),
      review: content.toString(),
      rating: currentValue.toString(),
    }).then((res) => {
      const res123 = onReviews();
      setShowSnackbar(true);
      setContent("");
      setCurrentValue(0);
      setIsFormValid(false);
    });
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleClickStar = (value) => {
    setCurrentValue(value);
    setShowError(false);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(undefined);
    setIsFormValid(content.trim() !== "");
  };

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleAddReview = (event) => {
    event.preventDefault();

    // Проверка валидности формы
    if (!isFormValid) {
      setShowError(true);
      return;
    }

    // Все поля заполнены, выполняем отправку данных
    addReview();
  };

  return (
    <div style={styles.container}>
      <Typography variant="h5">
        {t("ratingTitle")} <br /> {t("ratingDesc")}
      </Typography>
      <div className="start-container" style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={40}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleAddReview}
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label={t("comment")}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setIsFormValid(event.target.value.trim() !== "");
              setShowError(false);
              setIsFormValid(
                event.target.value.trim() !== "" &&
                  (hoverValue || currentValue) !== 0
              );
            }}
            multiline
            rows={6}
            style={{ width: 600 }}
            error={showError && content.trim() === ""}
            helperText={
              showError && content.trim() === "" && "Введите комментарий"
            }
          />
        </div>
      </Box>

      <Stack spacing={2} direction="row">
        <Button
          type="submit"
          style={styles.button}
          variant="contained"
          onClick={handleAddReview}
        >
          {t("send")}
        </Button>
      </Stack>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {t("sendRecord")}
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flexStart",
    marginTop: 40,
    maxWidth: 400,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 200,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
    marginTop: 10,
  },
};

export default BasicRating;
