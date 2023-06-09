import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import {
  selectComments,
  deleteComment as deleteCommentAction,
} from "../../store/commentsSlice";
import { logout, selectUserState } from "../../store/userSlice";

const colors = {
  orange: "rgb(250, 175, 0)",
  grey: "#a9a9a9",
  main: "rgb(38,65,103)",
  white: "white",
  black: "black",
};

function SubmitComment() {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const currentUser = useSelector(selectUserState);
  const commentsFromStore = useSelector(selectComments);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [deletedComments, setDeletedComments] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const openSnackbar = () => {
    setShowSnackbar(true);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleConfirmDelete = () => {
    if (commentToDelete && commentToDelete.id_comments !== undefined) {
      axios
        .delete(`http://localhost:3000/comments/${commentToDelete.id_comments}`)
        .then((response) => {
          // Handle successful deletion
          // Dispatch the delete comment action
          dispatch(deleteCommentAction(commentToDelete.id_comments));
          // Add the deleted comment to the deletedComments state
          setDeletedComments((prevDeletedComments) => [
            ...prevDeletedComments,
            commentToDelete.id_comments,
          ]);
          // Show the snackbar
          setShowSnackbar(true);
          // Close the delete confirmation dialog
          closeDeleteConfirmation();
        })
        .catch((error) => {
          // Handle error
          console.log(error);
        });
    } else {
      console.log(
        "commentToDelete or commentToDelete.id_comments is undefined"
      );
    }
  };

  const handleDeleteComment = (comment) => {
    setCommentToDelete(comment);
    openDeleteConfirmation();
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // Get current comments based on pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentsFromStore.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="comment-container" style={{ width: "100%" }}>
      <div
        className="submit-comment-container"
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          marginTop: 5,
        }}
      >
        {currentComments.map((comment) => {
          const dateString = comment.date_at;
          const dateObject = new Date(dateString);
          const year = dateObject.getFullYear();
          const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
          const day = ("0" + dateObject.getDate()).slice(-2);
          const hours = ("0" + dateObject.getHours()).slice(-2);
          const minutes = ("0" + dateObject.getMinutes()).slice(-2);
          const formattedDate = `${day}.${month}.${year}    ${hours}:${minutes}`;

          const isCurrentUserComment = comment.name === currentUser.name;
          const showDeleteIcon = isCurrentUserComment && currentUser.id;
          const isCommentDeleted = deletedComments.includes(
            comment.id_comments
          );

          if (isCommentDeleted) {
            return null; // Не отображать удаленный комментарий
          }

          return (
            <div
              className="comment-review"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              key={comment.id_comments}
            >
              <span className="comment-review-date">{formattedDate}</span>
              <div className="comment-review-rating">
                <Typography fontWeight={500} variant="subtitle1" component="h2">
                  {comment.name}
                </Typography>
              </div>
              <div className="comment-review-text">{comment.comment}</div>
              <div
                className="delete-icon-container"
                onClick={() => handleDeleteComment(comment)}
              >
                {showDeleteIcon && <FaTimes className="delete-icon" />}
              </div>
            </div>
          );
        })}
      </div>

      {commentsFromStore.length > commentsPerPage && (
        <Breadcrumbs
          separator="›"
          aria-label="comments pagination"
          style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
        >
          {Array.from(
            { length: Math.ceil(commentsFromStore.length / commentsPerPage) },
            (_, index) => (
              <Link
                key={index + 1}
                color={index + 1 === currentPage ? "text.primary" : "inherit"}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: 20,
                  borderRadius: "50%",
                  padding: "8px 15px",
                  color:
                    index + 1 === currentPage ? colors.white : colors.black,

                  backgroundColor:
                    index + 1 === currentPage ? colors.main : "transparent",
                }}
                onClick={(event) => handlePageChange(event, index + 1)}
              >
                {index + 1}
              </Link>
            )
          )}
        </Breadcrumbs>
      )}

      <Dialog
        open={showDeleteConfirmation}
        onClose={closeDeleteConfirmation}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle> {t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1"> {t("areYouSure")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="error">
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

export default SubmitComment;
