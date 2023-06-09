import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import Axios from "axios";

import { useLocalisation } from "../../hooks/useLocalisation";
import { useLines } from "../../hooks/useLines";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { StationsModal } from "./StationsModal";
import { FormRow } from "./FormRow";
import { AddPictureButton } from "./AddPictureButton";

export const StationsHeader = ({ name, lineId, setStationAdded }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [value, setValue] = useState();
  const getLocalisation = useLocalisation();
  const getLines = useLines();

  const [values, setValues] = useState({
    stationNameDB: "",
    stationDescriptionDB: "",

    stationNameEN: "",
    stationNameBY: "",
    stationNameRU: "",

    stationDescriptionEN: "",
    stationDescriptionBY: "",
    stationDescriptionRU: "",

    // selectedImage: null,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const {
    stationNameDB,
    stationDescriptionDB,
    stationNameEN,
    stationNameBY,
    stationNameRU,
    stationDescriptionEN,
    stationDescriptionBY,
    stationDescriptionRU,
  } = values;

  const addStation = () => {
    Axios.post(
      "http://localhost:3000/station",
      {
        lineId,
        stationNameDB,
        stationDescriptionDB,
        stationNameEN,
        stationNameBY,
        stationNameRU,
        stationDescriptionEN,
        stationDescriptionBY,
        stationDescriptionRU,
        image: selectedImage,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        setIsChanging(false);
        getLocalisation();
        getLines().catch((err) => {
          console.error("err on getLines", err);
        });
        setStationAdded(stationNameDB);
        setIsOpen(false);
      }
    });
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useEffect(() => {
    getLocalisation();
    getLines().catch((err) => {
      console.error("err on getLines", err);
    });
  }, []);

  const content = (
    <>
      <TextField
        name="stationNameDB"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название станции"
        maxRows={4}
        value={values.stationNameDB}
        onChange={handleChange}
        type="text"
        required
      />
      <TextField
        name="stationDescriptionDB"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Описание станции"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
      />

      <TextField
        name="stationNameEN"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название станции на английском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="stationNameBY"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название станции на белорусском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="stationNameRU"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название станции на русском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />

      <TextField
        name="stationDescriptionEN"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Описание станции на английском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="stationDescriptionBY"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Описание станции на белорусском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="stationDescriptionRU"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Описание станции на русском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />

      <AddPictureButton
        style={{ marginBottom: "10px" }}
        setSelectedImage={setSelectedImage}
      />
    </>
  );

  return (
    <>
      <Grid
        item
        md={9}
        xs={12}
        sx={{
          backgroundColor: "white",
        }}
      >
        <div
          style={{ width: "100%", fontSize: "20px" }}
          className="change-lines"
        >
          Добавление и редактирование станций метро:
        </div>
      </Grid>
      <Grid item md={3} xs={12} className="buttonContainer">
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleOpenModal}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Grid>
      <StationsModal
        header={"Добавить станцию"}
        content={content}
        onSave={addStation}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
