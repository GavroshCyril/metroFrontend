import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Modal, Backdrop, Fade } from "@mui/material";
import kompozicia1 from "../../Assets/Images/kompozicia1.jpg";
import kompozicia2 from "../../Assets/Images/kompozicia2.jpg";
import kompozicia4 from "../../Assets/Images/kompozicia3.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const classes = {
  container: {
    cursor: "pointer",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  img: {
    outline: "none",
    zIndex: 99,
  },
};

export default function ImagesList() {
  /*   const classes = useStyles(); */
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("false");

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value) => {
    setImage(value);
    setOpen(true);
  };
  return (
    <div
      className="Image-container"
      style={{ cursor: "pointer" }}
      title="Открыть изображение"
    >
      <ImageList
        styles={classes.gridList}
        variant="quilted"
        cols={4}
        rowHeight={150}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].cols
            }
            rows={
              pattern[
                index - Math.floor(index / pattern.length) * pattern.length
              ].rows
            }
          >
            <img
              {...srcset(
                item.img,
                200,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows,
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              )}
              onClick={(e) => handleImage(item.img)}
              alt={item.title}
              loading="lazy"
            />
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                color: "white",
                background: "rgba(0,0,0, .3)",
                p: "5px",
                borderTopRightRadius: 8,
              }}
            ></Typography>
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        /* className={classes.modal} */
        style={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade
          in={open}
          timeout={500}
          style={classes.img} /*  className={classes.img} */
        >
          <img
            src={image}
            alt="asd"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
        </Fade>
      </Modal>
    </div>
  );
}

const itemData = [
  {
    img: kompozicia1,
    title: "01",
  },
  {
    img: kompozicia2,
    title: "02",
  },
  {
    img: "https://transphoto.org/photo/11/80/15/1180154.jpg",
    title: "03",
  },
  {
    img: kompozicia4 /* "https://www.holiday.by/files/sights/thumbnails/sights_gallery_fullsize/250d20d6dd9d9d0b2989f313ca4c39f6-orig.jpg" */,
    title: "04",
  },
];

const pattern = [
  {
    rows: 4,
    cols: 2,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 1,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
