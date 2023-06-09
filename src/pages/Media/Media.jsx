import React, { useEffect, useState } from "react";
import "./Media.css";
import ImagesList from "../../components/ImagineList/ImagesList";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import Stack from "@mui/material/Stack";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link";
import Lang from "../../components/HeaderOptions";

const Media = () => {
  const [t] = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const handleDownload = () => {
    const fileUrl = "../../Assets/documents/history.docx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "history.docx";
    link.click();
  };

  const steps = [
    {
      label: "Step 1",
      content: (
        <div className="content">
          <div className="description">
            <YoutubeEmbed embedId="K0ytyKc1vwE" />
            <p className="Media-paragraph">
              <span> {t("search.let")} </span>
              {t("search.description01")}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Step 2",
      content: (
        <div className="content">
          <Stack direction="row" spacing={1} className="content-span">
            <Chip label={t("search.label")} />
          </Stack>
          <ImagesList />
        </div>
      ),
    },
    {
      label: "Step 3",
      content: (
        <div className="content">
          <p className="Media-desc"> {t("search.description02")}</p>
          <p className="Media-desc"> {t("search.description03")}</p>
        </div>
      ),
    },
    {
      label: "Step 4",
      content: (
        <div className="content">
          <p className="Media-desc"> {t("search.description04")}</p>

          <Alert severity="info">
            <AlertTitle>{t("search.infoTitle")}</AlertTitle>
            {t("search.infoSubtitle")}
          </Alert>
          <Stack direction="row" spacing={2} className="links">
            <Button variant="outlined" startIcon={<PrintIcon />}>
              <Link
                href="https://metropoliten.by/o_metropolitene/history_of_the_development/?print=y"
                underline="none"
              >
                {t("printMaterial")}
              </Link>
            </Button>
            <Button
              onClick={handleDownload}
              variant="outlined"
              endIcon={<DownloadIcon />}
            >
              {t("downloadMaterial")}
            </Button>
          </Stack>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="Media-container">
      <div className="Map">
        <div className="Map-container">
          <h2 className="title">{t("search.title")}</h2>
        </div>
        <Lang />
      </div>

      <div className="Dots-container">
        <div className="Dots">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`Dot ${activeStep === index ? "active" : ""}`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
        <div className="Dots-content">{steps[activeStep].content}</div>
      </div>

      <div className="content">
        <div className="Dots-buttons">
          {activeStep !== 0 && (
            <Button onClick={handleBack}>{t("back")}</Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button onClick={handleNext}>{t("next")}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
