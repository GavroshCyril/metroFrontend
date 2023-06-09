import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Lang from "../../components/HeaderOptions";
import contactIcon from "../../Assets/Images/contact.png";
import "./payment.css";

const payments = [
  {
    id: "bsk-metro",
    title: "БСК-МЕТРО",
    description:
      "Проездной билет на бесконтактной смарт-карте государственного предприятия «Минский метрополитен» (радиокарта) для проезда в метрополитене",
    imageUrl: "https://metropoliten.by/images/oplata/proezdnoy1.png",
    text: "Пополнить проездной билет можно в кассах метрополитена, а также самостоятельно в банковских инфокиосках расположенных в вестибюлях станций. Произвести пополнение возможно на количество дней или на количество поездок в соответствии с существующими видами билетной продукции. В настоящее время возможно три варианта пополнения проездных билетов метрополитена:\n- По окончании срока действия или использования количества поездок на БСК имеется возможность произвести пополнение проездного билета либо на количество поездок, либо на количество суток.\n- Если срок действия проездного билета на количество суток не истек, то произвести пополнение возможно только на количество суток. Максимальное количество суток до которого можно пополнить проездной билет – 45 суток.\n- Если на проездном билете на количество поездок все поездки не использованы и срок его действия не истек, то произвести пополнение возможно только на количество поездок. Максимальное количество поездок, до которого можно пополнить проездной билет – 60 поездок. Срок действия проездного билета на 10, 20, 30, 40, 50 поездок – 60 суток с даты последнего пополнения, 60 поездок – 80 суток с даты последнего пополнения.",
  },
  {
    id: "bsk-minsktrans",
    title: "Карта Минсктранс",
    description:
      "Проездной билет на бесконтактной смарт-карте государственного предприятия «Минсктранс»",
    imageUrl: "https://metropoliten.by/images/oplata/kard3.png",
    text: "Пополнить проездной билет можно в кассах метрополитена, а также самостоятельно в банковских инфокиосках расположенных в вестибюлях станций. Произвести пополнение возможно на количество дней или на количество поездок в соответствии с существующими видами билетной продукции. В настоящее время возможно три варианта пополнения проездных билетов метрополитена:\n- По окончании срока действия или использования количества поездок на БСК имеется возможность произвести пополнение проездного билета либо на количество поездок, либо на количество суток.\n- Если срок действия проездного билета на количество суток не истек, то произвести пополнение возможно только на количество суток. Максимальное количество суток до которого можно пополнить проездной билет – 45 суток.\n- Если на проездном билете на количество поездок все поездки не использованы и срок его действия не истек, то произвести пополнение возможно только на количество поездок. Максимальное количество поездок, до которого можно пополнить проездной билет – 60 поездок. Срок действия проездного билета на 10, 20, 30, 40, 50 поездок – 60 суток с даты последнего пополнения, 60 поездок – 80 суток с даты последнего пополнения.",
  },
  {
    id: "bsk-bank",
    title: "Оплата банковской картой",
    description:
      "В рамках проекта по внедрению бесконтактной оплаты проезда в метрополитене пассажиры могут оплатить разовый проезд с помощью бесконтактной банковской картой Visa payWave , MasterCard Contactless, БЕЛКАРТ-Maestro, БЕЛКАРТ.",
    imageUrl: contactIcon,
    text: "Для этого приложите карту к валидатору, расположенному на верхней крышке турникета и обозначенному соответствующим логотипом. При успешной оплате проход через турникет будет разрешен и со счета вашей карты течение 48 часов будет автоматически списана стоимость поездки.  В случае нескольких успешных оплат проезда, совершенных в течение 48 часов, совершенные операции агрегируются в одну транзакцию – но не более 4 успешных оплат проезда. Исходя из действующего тарифа за проезд в метро 0,90 рубля, сумма одной транзакции не превышает 3,60 рублей. ",
  },
  {
    id: "bsk-zeton",
    title: "Жетон",
    description:
      "Проездной билет на бесконтактной смарт-карте государственного предприятия «Минский метрополитен» (радиокарта) для проезда в метрополитене",
    imageUrl: "https://metropoliten.by/images/oplata/jetony1.png",
    text: "П",
  },
];

const PaymentDetailsPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedPayment = payments.find((payment) => payment.id === id);

  if (!selectedPayment) {
    return (
      <div className="content">
        <Typography variant="h4">Оплата не найдена</Typography>
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={() => navigate("/payment")}
        >
          Назад к выбору оплаты
        </Button>
      </div>
    );
  }

  return (
    <div className="ContactsWrapper">
      <div className="PaymentDetails">
        <div className="Map-container">
          <h2 className="title"> {selectedPayment.title}</h2>
        </div>
        <Lang />
      </div>
      <div className="content">
        <img
          src={selectedPayment.imageUrl}
          alt={selectedPayment.title}
          className="payment-image"
        />
        <Typography variant="body1">{selectedPayment.description}</Typography>
        <Typography
          style={{ marginTop: 20 }}
          variant="body2"
          className="payment-text"
        >
          {selectedPayment.text}
        </Typography>
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={() => navigate("/payment")}
        >
          Назад к выбору оплаты
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
