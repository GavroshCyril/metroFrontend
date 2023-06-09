import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import "./payment.css";
import Lang from "../../components/HeaderOptions";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import contactIcon from "../../Assets/Images/contact.png";

const payments = [
  {
    id: "bsk-metro",
    title: "БСК-Метро",
    description:
      "Проездной билет на бесконтактной смарт-карте государственного предприятия «Минский метрополитен» (радиокарта) для проезда в метрополитене",
    imageUrl: "https://metropoliten.by/images/oplata/proezdnoy1.png",
  },
  {
    id: "bsk-minsktrans",
    title: "Карта Минсктранс",
    description:
      "Проездной билет на бесконтактной смарт-карте государственного предприятия «Минсктранс» ",
    imageUrl: "https://metropoliten.by/images/oplata/kard3.png",
  },
  {
    id: "bsk-bank",
    title: "Оплата банковской картой",
    description:
      "В рамках проекта по внедрению бесконтактной оплаты проезда в метрополитене пассажиры могут оплатить разовый проезд с помощью бесконтактной банковской картой Visa payWave , MasterCard Contactless, БЕЛКАРТ-Maestro, БЕЛКАРТ. ",
    imageUrl: contactIcon,
  },
  {
    id: "bsk-zeton",
    title: "Жетон",
    imageUrl: "https://metropoliten.by/images/oplata/jetony1.png",
  },
];

const PaymentPage = () => {
  const [t] = useTranslation();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const handleGoBack = () => {
    setSelectedPayment(null);
  };

  const handleAlertClick = () => {
    window.open(
      "https://metropoliten.by/images/oplata/%D0%A2%D0%B0%D1%80%D0%B8%D1%84%D1%8B%20%D0%BD%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%B7%D0%B4.pdf",
      "_blank"
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="Payment">
      <div className="Payment-container">
        <span className="Payment-title">Оплата проезда</span>
        <Lang />
        <div className="content">
          <Slider {...sliderSettings} className="slider-container">
            {payments.map((payment) => (
              <div key={payment.id} className="slider-card">
                <Card
                  sx={{
                    mx: 1,
                    minWidth: 350,
                    p: 2,
                    backgroundColor: "transparent",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "grab",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    },
                    "&:active": {
                      cursor: "grabbing",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    src={payment.imageUrl}
                    alt={payment.title}
                    sx={{ height: 200, objectFit: "cover" }}
                  />
                  <CardContent>
                    <p style={{ marginBottom: 10 }}>{payment.title}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/payment/${payment.id}`}
                    >
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              style={{ marginTop: 20, cursor: "pointer" }}
              severity="info"
              onClick={handleAlertClick}
              className="alert-hover"
            >
              Посмотреть тарифы на проезд в городском пассажирском транспорте
            </Alert>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
