import React, { useEffect, useState } from "react";
import "./News.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Lang from "../../components/HeaderOptions";
import News from "../../components/News";
import { selectLocalizedState } from "../../store/localizationSlice";
import { useNews } from "../../hooks/useNews";
import { selectNews } from "../../store/newsSlice";
import { useLocalisation } from "../../hooks/useLocalisation";

const Home = () => {
  const [t] = useTranslation();
  const localizedState = useSelector(selectLocalizedState);
  const newsState = useSelector(selectNews);
  const onLocalisation = useLocalisation();
  const onNews = useNews();
  const [news, setNews] = useState([]);

  useEffect(() => {
    onLocalisation();
    onNews();
  }, [])

  useEffect(() => {
    setNews([])
      newsState.map((currentNew) => {
        const timeOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }

        setNews(news => [...news, { 
          date: new Date(currentNew.news_date).toLocaleString([], timeOptions),
          title: localizedState[`${currentNew.news_title}`],
          content: localizedState[`${currentNew.news_description}`]
        }])
      });
  }, [localizedState]);

  // const newsMock = [
  //   {
  //     date: "22.04.2023 12:22",
  //     title: "ПРИНЯЛИ ДОСТОЙНОЕ УЧАСТИЕ В РЕСПУБЛИКАНСКОМ СУББОТНИКЕ",
  //     content:
  //       "Государственное предприятие «Минский метрополитен» и АО «Метровагонмаш» (г. Мытищи, Российская Федерация) подписали контракт на поставку 28 новых современных вагонов метро для белорусской подземки. Из них планируется сформировать 7 четырехвагонных электропоездов",
  //   },
  //   {
  //     date: "21.04.2023 14:16",
  //     title: "22 АПРЕЛЯ МЕТРО БУДЕТ РАБОТАТЬ ПО ГРАФИКУ РАБОЧЕГО ДНЯ",
  //     content:
  //       "Вниманию пассажиров! 22 апреля 2023 года, в день республиканского субботника, движение электропоездов Минского метрополитена будет организовано по графику рабочего дня. 22 апреля работники государственного предприятия «Минский метрополитен» примут активное участие в республиканском субботнике. ",
  //   },

  //   {
  //     date: "20.03.2022 09:14",
  //     title: "МИНСКИЙ МЕТРОПОЛИТЕН ЗАКУПИТ 28 ВАГОНОВ В РОССИИ",
  //     content:
  //       "Метрополитеновцы занимались наведением порядка на рабочих местах и благоустройством закрепленной территории. Работы велись на станциях и в пешеходных переходах всех линий, в электродепо «Московское» и «Могилевское», инженерных корпусах, здании эксплуатационного персонала, двух общежитиях предприятия. ",
  //   },
  // ];

  return (
    <div className="News">
      <div className="News-container">
        <span className="News-title">{t("nav.news")}</span>
        <Lang />

        <div className="card-container">
          <div className="news-cotainer">
            {news.map((item, index) => (
              <News
                key={index}
                date={item.date}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
