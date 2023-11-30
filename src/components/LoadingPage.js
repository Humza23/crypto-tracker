import React from "react";

import "../loadingPage.css";
import coinImage from "../images/bitcoinImg.png";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <img className="coin-image" src={coinImage} alt="Rolling Coin" />
    </div>
  );
};
export default LoadingPage;
