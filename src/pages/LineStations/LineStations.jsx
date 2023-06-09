import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Lang from "../../components/HeaderOptions";
import { useTranslation } from "react-i18next";

import "./index.css";

import { selectLine } from "../../store/linesSlice";
import LineSlide from "./LineSlide";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const LineStations = () => {
  const [t] = useTranslation();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const currentLineName = path[2];

  const line = useSelector((state) => {
    return selectLine(state, currentLineName);
  });

  const stations = line ? line.stations : [];
  const color = useMemo(() => {
    switch (currentLineName) {
      case "home_zelenoluzskayaTitle":
        return "green";
      case "home_avtozavodskayaTitle":
        return "red";
      case "home_zelenoluzskayaTitle":
        return "blue";
    }
  }, [currentLineName]);

  const title = useMemo(() => {
    switch (currentLineName) {
      case "home_zelenoluzskayaTitle":
        return "Зеленолужская";
      case "home_avtozavodskayaTitle":
        return "Автозаводская";
      case "home_moscowTitle":
        return "Московская";
    }
  }, [currentLineName]);

  const dotClickHandler = (index) => setActiveSlide(index);

  const [activeSlide, setActiveSlide] = useState(0);
  console.log("stations", stations)
  return (
    <div className="Home">
      <div className="Home-container">
        <Lang />

        <span className="Home-title" style={{ marginTop: "100px" }}>
          {line && title}
        </span>
        <div className="dots" style={{ background: color, marginTop: "50px" }}>
          {stations &&
            stations.map((st, index) =>
              index < stations.length - 2 ? (
                <Box
                  key={index}
                  onClick={() => dotClickHandler(index)}
                  className="dot"
                />
              ) : null
            )}
        </div>
        <div className="slider-wrapper">
          <Button
            className="nav_btn"
            sx={{ marginRight: "20px" }}
            onClick={() => dotClickHandler(activeSlide - 1)}
          >
            &#5176;
          </Button>
          <div className="slider">
            <div
              className="slides-container"
              style={{ marginLeft: `-${440 * activeSlide}px` }}
            >
              {stations &&
                stations.map((station) => (
                  <LineSlide
                    key={station.station_description}
                    station={station}
                  />
                ))}
            </div>
          </div>
          <Button
            className="nav_btn"
            onClick={() =>
              setActiveSlide(
                activeSlide < stations.length - 3
                  ? activeSlide + 1
                  : activeSlide
              )
            }
          >
            &#5171;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LineStations;
