import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./comments.css";
import Axios from "axios";
import {
  Stack,
  Button,
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { selectUserState } from "../../store/userSlice";
import { useComments } from "../../hooks/useComments";
import { useTranslation } from "react-i18next";

function CommentForm() {
  const [t] = useTranslation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false); // Состояние для отображения ошибки

  const userState = useSelector(selectUserState);
  const onComments = useComments();

  // userState.id
  const addComment = () => {
    if (!comment) {
      setError(true); // Установка состояния ошибки, если поле комментария пустое
      return;
    }

    Axios.post("http://localhost:3000/comments", {
      userId: userState.id.toString(),
      comment: comment.toString(),
    }).then((res) => {
      const res123 = onComments();
      openSnackbar();
      setComment("");
      setError(false);
    });
  };

  useEffect(() => {
    Axios.get("/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddComment = (event) => {
    event.preventDefault();
  };

  const openSnackbar = () => {
    setShowSnackbar(true);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div style={styles.container}>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity="success">
          {t("sendRecord")}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            /* width: "25ch" */
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleAddComment}
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            className="comment-from"
            label={t("offerLabel")}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              setError(false); // Сброс состояния ошибки при изменении значения поля
            }}
            multiline
            rows={2}
            style={{ width: "100%" }}
            error={error} // Применение стиля ошибки к полю ввода
            helperText={error && t("offerLabel")} // Отображение сообщения об ошибке
          />
        </div>
      </Box>

      <Stack spacing={2} direction="row">
        <Button
          type="submit"
          style={styles.button}
          variant="contained"
          onClick={() => addComment()}
        >
          {t("send")}
        </Button>
      </Stack>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flexStart",
    marginTop: 15,
    marginBottom: 20,
    /*     maxWidth: 400, */
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

export default CommentForm;
