import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Resources.css";
import { useTranslation } from "react-i18next";
import Lang from "../../components/HeaderOptions";
import { Stack, Link, Alert, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Timer from "../../components/Timer";
import { saveAs } from "file-saver";

import { isUserLoggedIn } from "../../store/userSlice";
import { useComments } from "../../hooks/useComments";

import SubmitComment from "../../components/CommentComponent/SubmitComment";
import CommentForm from "../../components/CommentComponent/CommentForm";

const Resources = () => {
  const [t] = useTranslation();
  const onComments = useComments();

  useEffect(() => {
    const res = onComments();
  });

  const isLoggedIn = useSelector(isUserLoggedIn);

  const downloadImage = () => {
    let url =
      "https://4.downloader.disk.yandex.ru/preview/11a82e15a7fb2f4e10516c7daa224d3e934c49e6d6185bba168d170bdbb1c426/inf/8Y_Zje3ZPUwPlgpBBsvm--6Fd04MGDjfk81JgW8kNkEDsTlfZZ2ivTCHVxztc8gxhb_9HtXTjxgLyIrBy4dfgw%3D%3D?uid=1458648511&filename=metro.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1458648511&tknv=v2&size=1903x929";
    saveAs(url, "Переспективная-карта-строения-метрополитена-до-2050-года"); // Put your image url here.
  };

  return (
    <div className="ContactsWrapper">
      <div className="Resources">
        <div className="Map-container">
          <h2 className="title"> {t("nav.info")}</h2>
        </div>
        <Lang />
      </div>

      <div className="content">
        <div className="description">
          <p className="resources-desc">
            {t("resources.desc01")}
            <br /> <br /> <br />
            {t("resources.desc02")}
            <br /> <br /> <br />
            {t("resources.desc03")}
          </p>
          <Timer className="timer" />
        </div>

        <Stack direction="row" spacing={2} className="links">
          <Button
            onClick={downloadImage}
            variant="outlined"
            endIcon={<DownloadIcon />}
          >
            <Link /* href="./metro.jpg"  */ underline="none" /* download */>
              {t("resources.schema")}
            </Link>
          </Button>
        </Stack>

        <Typography
          className="comment-title"
          fontWeight={700}
          variant="h4"
          component="h2"
          style={{ marginTop: 15 }}
        >
          {t("resources.offer")}
        </Typography>

        {isLoggedIn ? (
          <CommentForm />
        ) : (
          <div className="cotainer-ratings-info">
            <Stack
              style={{ marginTop: "10px" }}
              sx={{ width: "100%" }}
              spacing={2}
            >
              <Alert severity="info">
                {t("resources.shareOffer")}{" "}
                <Link href="/auth" underline="none" className="warning-login">
                  {t("resources.enterPersAcc")}
                </Link>
              </Alert>
            </Stack>
          </div>
        )}

        <SubmitComment />
      </div>
    </div>
  );
};

export default Resources;
