import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import "./HomeAdmin.css";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import { ruLang } from "../../i18n/lang/ru";
import { useSelector } from "react-redux";
import {
  selectLocalizedState,
  selectLocale,
} from "../../store/localizationSlice";
import { useLocalisation } from "../../hooks/useLocalisation";
import { FormRow } from "./FormRow";
import { StationsHeader } from "./StationsHeader";
import { PictureRow } from "./PictureRow";
import { DeleteStantion } from "./DeleteStantion";
import { HomeSection } from "./Sections/HomeSection";
import { NewsSection } from "./Sections/NewsSection";

import { selectLines } from "../../store/linesSlice";
import { useLines } from "../../hooks/useLines";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const HomeAdmin = (props) => {
  const [t] = useTranslation();

  const [value, setValue] = React.useState(0);

  const handleOneChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleOneChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("nav.home")} {...a11yProps(0)} />
            <Tab label={t("nav.news")} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HomeSection />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NewsSection />
        </TabPanel>
      </Box>
    </div>
  );
};
