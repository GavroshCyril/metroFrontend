import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/Home.jsx";
import Map from "./pages/Map/Map.jsx";
import Media from "./pages/Media/Media.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import Search from "./pages/Search/Search.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Register from "./pages/Register/Register.jsx";
import FisrtBranch from "./pages/FirstBranch/HomeFirstBranch/HomeFirstBranch.jsx";
import SecondBranch from "./pages/SecondBranch/HomeSecondBranch/HomeSecondBranch.jsx";
import ThirdBranch from "./pages/ThirdBranch/HomeThirdBranch/HomeThirdBranch.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import News from "./pages/News/News.jsx";
import Error from "./pages/Error/Error.jsx";
import Payment from "./pages/Payment/Payment";
import PaymentDetailsPage from "./pages/Payment/PaymentDetailsPage";
import MetroRulesPage from "./pages/MetroRulesPage";
import { TokenManager } from "./common/TokenManager.jsx";
import { LocalizationProvider } from "./common/LocalizationProvider.jsx";
import LineStations from "./pages/LineStations/LineStations";
import { isUserLoggedIn, isUserAdmin, logout } from "./store/userSlice";
import Booking from "./pages/Booking/Booking";
import Lang from "./components/HeaderOptions";
import "./components/Slider/Slider.css";

const App = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const isAdmin = useSelector(isUserAdmin);
  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <TokenManager>
          <LocalizationProvider>
            <Sidebar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/rules" element={<MetroRulesPage />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/first_queue" element={<Media />} />
              <Route path="/information" element={<Contacts />} />
              <Route path="/project_of_minsk_metro" element={<Search />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/news" element={<News />} />
              <Route path="/register" element={<Register />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/bluebranch" element={<FisrtBranch />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/:id" element={<PaymentDetailsPage />} />
              <Route path="/redbranch" element={<SecondBranch />} />
              <Route path="/greenbranch" element={<ThirdBranch />} />
              {isAdmin && isLoggedIn && (
                <Route path="/admin" element={<Admin />} />
              )}

              <Route path="/line/:name" element={<LineStations />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </LocalizationProvider>
        </TokenManager>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
