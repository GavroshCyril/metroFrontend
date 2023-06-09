import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import Axios from "axios";

import { useLocalisation } from "../../hooks/useLocalisation";
import { useNews } from "../../hooks/useNews";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { StationsModal } from "./StationsModal";
import { FormRow } from "./FormRow";

export const NewsHeader = ({ name, newId, setNewAdded }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [value, setValue] = useState();
  const getLocalisation = useLocalisation();

  const getNews = useNews();

  const [values, setValues] = useState({
    newsTitleDB: "",
    newsDescriptionDB: "",

    newsTitleEN: "",
    newsTitleBY: "",
    newsTitleRU: "",

    newsDescriptionEN: "",
    newsDescriptionBY: "",
    newsDescriptionRU: "",

    // selectedImage: null,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const {
    newsTitleDB,
    newsDescriptionDB,
    newsTitleEN,
    newsTitleBY,
    newsTitleRU,
    newsDescriptionEN,
    newsDescriptionBY,
    newsDescriptionRU,
  } = values;

  const /* addStation */ addNew = () => {
      Axios.post(
        "http://localhost:3000/news",
        {
          newsTitleDB,
          newsDescriptionDB,
          newsTitleEN,
          newsTitleBY,
          newsTitleRU,
          newsDescriptionEN,
          newsDescriptionBY,
          newsDescriptionRU,
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
          getNews().catch((err) => {
            console.error("err on getNews", err);
          });
          /* setStationAdded(stationNameDB); */
          setNewAdded(newsTitleDB);
          setIsOpen(false);
        }
      });
    };

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useEffect(() => {
    getLocalisation();
    getNews().catch((err) => {
      console.error("err on getNews", err);
    });
  }, []);

  const content = (
    <>
      <TextField
        name="newsTitleDB"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название новости"
        maxRows={4}
        value={values.newsTitleDB}
        onChange={handleChange}
        type="text"
        required
      />
      <TextField
        name="newsDescriptionDB"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Текст новости"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
      />

      <TextField
        name="newsTitleEN"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название новости на английском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="newsTitleBY"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название новости на белорусском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="newsTitleRU"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Название новости на русском"
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />

      <TextField
        name="newsDescriptionEN"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Текст новости на английском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="newsDescriptionBY"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Текст новости на белорусском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
      />
      <TextField
        name="newsDescriptionRU"
        style={{ width: "100%", marginBottom: "10px" }}
        id="outlined-multiline-flexible"
        label="Текст новости на русском"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        type="text"
        required
        // readOnly={!isChanging}
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
          Добавление и редактирование новостей:
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
        header={"Добавить новость"}
        content={content}
        onSave={addNew}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
