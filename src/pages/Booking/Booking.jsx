import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormComponent from "../../components/FormComponent";

const Search = () => {
  const [t] = useTranslation();
  return (
    <div className="booking-container">
      <FormComponent />
    </div>
  );
};

export default Search;
