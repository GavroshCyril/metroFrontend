import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../pages/News/News.css";
import { useSelector } from "react-redux";
import { selectLocalizedState } from "../store/localizationSlice";
import { useTranslation } from "react-i18next";

function News({ date, title, content }) {
  const state = useSelector(selectLocalizedState);
  const [t] = useTranslation();
  return (
    <div>
      <Card sx={{ minWidth: 440, maxWidth: 200 }}>
        <CardContent>
          <Typography
            className="date"
            sx={{ fontSize: 12, mb: 2 }}
            color="text.secondary"
            gutterBottom
            style={{ color: "white" }}
          >
            {date}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: 18 }} variant="h6" component="div">
            {title}
          </Typography>

          <Typography sx={{ maxHeight: 100, mb: 5 }} variant="body2">
            {content}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default News;
