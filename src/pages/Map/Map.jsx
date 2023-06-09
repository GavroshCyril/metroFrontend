import React, { useEffect, useState } from "react";
import "./Map.css";
import { useTranslation } from "react-i18next";
import Mappp from "../../Assets/Images/metro.png";
import Lang from "../../components/HeaderOptions";
import imgEng from "../../i18n/lang/mapofmetroENG.jpg";
import imgRu from "../../i18n/lang/mapofmetroRU.jpg";
import imgBel from "../../i18n/lang/mapofmetroBEL.jpg";

const Map = () => {
  const [t] = useTranslation();

  return (
    <div className="MapWrapper">
      <div className="MapImg">
        <div className="Map-container">
          <h2 className="title">{t("map.title")}</h2>
        </div>
        <Lang />
      </div>
      <div className="Map-info">
        <img
          className="content-img"
          src={
            localStorage.getItem("i18nextLng") === "en"
              ? imgEng
              : localStorage.getItem("i18nextLng") === "bel"
              ? imgBel
              : imgRu
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default Map;
