import React, { useState } from "react";
import { Container, Typography, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

const FormComponent = () => {
  const [t] = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "cooperation.by@mail.ru",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    note: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSubmitSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Проверка заполнения полей
    const errors = {};
    let hasErrors = false;
    for (const field in formData) {
      if (formData[field].trim() === "") {
        errors[field] = true;
        hasErrors = true;
      }
    }
    setFormErrors(errors);

    if (hasErrors) {
      // Поля не заполнены, вывести предупреждение или выполнить другие действия
      return;
    }

    setIsSubmitting(true);

    axios
      .post("http://localhost:3000/submit-form", formData)
      .then((response) => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "cooperation.by@mail.ru",
          note: "",
        });
      })
      .catch((error) => {
        console.error("error POST submit-form", error);
        setIsSubmitting(false);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {t("booking.title")}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          label={t("booking.fio")}
          margin="normal"
          error={formErrors.fullName}
          helperText={formErrors.fullName && t("booking.typeFio")}
        />
        <TextField
          fullWidth
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          label={t("booking.nomerTel")}
          margin="normal"
          error={formErrors.phoneNumber}
          helperText={formErrors.phoneNumber && t("booking.typeNomerTel")}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          label={t("booking.primeczanie")}
          placeholder={t("booking.callMe")}
          margin="normal"
        />

        <TextField
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          label={t("booking.elPozcta")}
          margin="normal"
          InputProps={{
            readOnly: true,
            style: { color: "#888", backgroundColor: "#f5f5f5" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: "1rem" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? t("booking.sendingLetter") : t("booking.sendLetter")}
        </Button>
        {submitSuccess && (
          <Alert severity="success" sx={{ marginTop: "1rem" }}>
            {t("booking.bookSuccess")}
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default FormComponent;
