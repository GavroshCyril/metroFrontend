import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { FormRow } from "../FormRow";
import { NewsHeader } from "../NewsHeader";
import { DeleteStantion } from "../DeleteStantion";
import { selectLocalizedState } from "../../../store/localizationSlice";
import { selectNews } from "../../../store/newsSlice";
import { useLocalisation } from "../../../hooks/useLocalisation";
import { useNews } from "../../../hooks/useNews";
import { useTranslation } from "react-i18next";

export const NewsSection = (props) => {
  const [t] = useTranslation();
  const state = useSelector(selectLocalizedState);
  const newsState = useSelector(selectNews);
  const localizedState = useSelector(selectLocalizedState);
  const onLocalisation = useLocalisation();
  const [newsAdded, setNewsAdded] = useState("");
  const [newsDeleted, setNewsDeleted] = useState("");

  const getNews = useNews();

  const stateObject = {};
  const [values, setValues] = useState(stateObject);

  useEffect(() => {
    if (newsState) {
      newsState.map((currentNew) => {
        stateObject[`${currentNew.news_title}`] =
          localizedState[`${currentNew.news_title}`];
      });
    }
    setValues(stateObject);
  }, [newsState]);

  useEffect(() => {
    onLocalisation();
    getNews()
      .then(() => {})
      .catch((err) => {
        console.error("err on getNews", err);
      });
    setValues(stateObject);
  }, [newsAdded, newsDeleted]);

  return (
    <form autoComplete="off" noValidate {...props} className="fonts">
      <Card sx={{ margin: 3 }}>
        <CardHeader title={t("nav.news")} />
        <Divider />
        <CardContent>
          {/* <Grid container spacing={3} className="header">
            <FormRow
              handleChange={handleChange}
              title={values.home_title}
              // saveTitle={saveTitle}
              name={"new.title"}
            />
          </Grid> */}
          {newsState.map((currentNew) => {
            /* 
            id_news
: 
3
news_date
: 
"2023-06-04T21:42:22.000Z"
news_description
: 
"1213"
news_title
: 
"кашка" */
            /* new_title01 */

            return (
              <>
                <Grid container spacing={2} className="line">
                  <FormRow
                    // handleChange={handleChange}
                    title={state[`${currentNew.news_title}`]}
                    // saveTitle={saveTitle}
                    name={currentNew.news_title}
                  />

                  <FormRow
                    // handleChange={handleChange}
                    title={state[`${currentNew.news_description}`]}
                    // saveTitle={saveTitle}
                    name={currentNew.news_description}
                  />
                </Grid>

                <NewsHeader
                  // handleChange={handleChange}
                  // title={state[`${line.line_description}`]}
                  newId={currentNew.id_news}
                  name={currentNew.news_description}
                  setNewsAdded={(name) => setNewsAdded(name)}
                />
              </>
            );
          })}
        </CardContent>
      </Card>
    </form>
  );
};
