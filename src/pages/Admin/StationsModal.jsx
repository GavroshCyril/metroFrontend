import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Box, Typography } from "@mui/material";
import Axios from "axios";
import {
  selectLocalizedState,
  selectLocale,
} from "../../store/localizationSlice";
import { useLocalisation } from "../../hooks/useLocalisation";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  /*  transform: "translate(-50%, -50%)", */
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const StationsModal = ({
  header,
  content,
  onSave,
  isOpen,
  handleCloseModal,
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>

          {content}
          <Button color="primary" variant="contained" onClick={onSave}>
            {t("save")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCloseModal}
          >
            {t("cancel")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
