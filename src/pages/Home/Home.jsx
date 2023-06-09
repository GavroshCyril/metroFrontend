import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";

import logoMetro from "../../Assets/Images/minsk-metro-logo.png";
import Lang from "../../components/HeaderOptions";
import { selectLocalizedState } from "../../store/localizationSlice";
import { selectLines } from "../../store/linesSlice";
import Slide from "./Slide";
import { setHeaderState } from "../../store/headerSlice";
import { useTranslation } from "react-i18next";

const Home = () => {
  const state = useSelector(selectLocalizedState);
  const linesState = useSelector(selectLines);
  const [activeSlide, setActiveSlide] = useState(0);

  const dispatch = useDispatch();
  const [t] = useTranslation();
  useEffect(() => {
    dispatch(
      setHeaderState({
        title: state.home_title,
        image: "../../Assets/Images/kavalskaya.jpg",
      })
    );
  }, [t]);

  return (
    <div className="Home">
      <div className="Home-container">
        <Lang />
        <div className="main-img">
          <img src={logoMetro} className="logo" alt="Misk Metro Logo" />
        </div>
        <span className="Home-title">
          {state.home_title} <br />
          <span>{state.home_subtitle} </span>
        </span>
        <div style={{ height: "600px", width: "1320px", marginTop: "20px" }}>
          <div
            className="slides-container"
            style={{ paddingLeft: `${440 * activeSlide}px` }}
          >
            {linesState.map((line) => (
              <Slide key={line.title} line={line} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
