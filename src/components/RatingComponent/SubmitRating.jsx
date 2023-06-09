import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isUserLoggedIn, selectUserState } from "../../store/userSlice";
import { FaTimes } from "react-icons/fa";
import "./Rating.css";
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Rating,
} from "@mui/material";
import { selectReviews, updateReviews } from "../../store/reviewsSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";

const colors = {
  orange: "rgb(250, 175, 0)",
  grey: "#a9a9a9",
};

function SubmitRating() {
  const [t] = useTranslation();
  const isLoggedIn = useSelector(isUserLoggedIn);
  const user = useSelector(selectUserState);
  const reviewsFromStore = useSelector(selectReviews);
  const dispatch = useDispatch();

  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [value, setValue] = useState(5);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  useEffect(() => {}, []);

  const handleDeleteReview = (review) => {
    const reviewId = review.id_rewiews;
    axios
      .delete(`http://localhost:3000/reviews/${reviewId}`)
      .then((response) => {
        const updatedReviews = reviewsFromStore.filter(
          (r) => r.id_rewiews !== reviewId
        );
        dispatch(updateReviews(updatedReviews));
        setSelectedReviewId(null);
        setShowSnackbar(true);
        closeDeleteConfirmation(); // Закрыть диалоговое окно после удаления
      })
      .catch((error) => {
        console.log("error during delete reviews", error);
      });
  };

  const confirmDeleteReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setOpenConfirmationDialog(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const isUserReview = (review) => {
    return isLoggedIn && review.userId === user.id;
  };

  const openSnackbar = () => {
    setShowSnackbar(true);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };
  const closeDeleteConfirmation = () => {
    setOpenConfirmationDialog(false);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flexStart",
      marginTop: 40,
      maxWidth: 400,
    },
    submitReviewCont: {
      position: "relative",
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
    deleteButton: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: 5,
      cursor: "pointer",
      background: "none",
      border: "none",
      color: "grey",
    },
  };

  return (
    <div className="rating-container" style={styles.container}>
      <Typography
        className="rating-title"
        fontWeight={700}
        variant="h4"
        component="h2"
      >
        {t("appreciated")}
      </Typography>

      <div className="submit-review-container">
        {reviewsFromStore.map((review) => {
          const dateString = review.date_at;
          const dateObject = new Date(dateString);
          const year = dateObject.getFullYear();
          const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
          const day = ("0" + dateObject.getDate()).slice(-2);
          const hours = ("0" + dateObject.getHours()).slice(-2);
          const minutes = ("0" + dateObject.getMinutes()).slice(-2);
          const formattedDate = `${day}.${month}.${year}    ${hours}:${minutes}`;

          const isCurrentUserReview = review.name === user.name;
          const showDeleteIcon = isCurrentUserReview && user.id;

          return (
            <div key={formattedDate} className="submit-review" style={styles.submitReviewCont}>
              <div className="submit-review-header">
                <span className="submit-review-date">{formattedDate}</span>
              </div>
              <div className="submit-review-rating">
                <Typography fontWeight={500} variant="subtitle1" component="h2">
                  {review.name}
                </Typography>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Rating
                    name="simple-controlled"
                    value={review.rating}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
              </div>
              <div className="submit-review-text">{review.review}</div>
              <div
                className="delete-icon-container"
                onClick={() => confirmDeleteReview(review.id_rewiews)}
              >
                {showDeleteIcon && <FaTimes className="delete-icon" />}
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={openConfirmationDialog}
        onClose={closeDeleteConfirmation}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle> {t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1"> {t("areYouSure")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDeleteReview({ id_rewiews: selectedReviewId })}
            color="error"
          >
            {t("delete")}
          </Button>
          <Button onClick={closeDeleteConfirmation}> {t("cancel")}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={t("successDelete")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity="success">
          {t("successDelete")}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubmitRating;
