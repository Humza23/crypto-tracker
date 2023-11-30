import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import ErrorComponent from "./components/ErrorComponent.js";
import SplashPage from "./components/SplashPage.js";

import useDarkMode from './hooks/useDarkMode.js'

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode(false);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(
        "https://ai.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then((res) => {  
        setCoinData(res.data)
        setLoading(false)
      }) 
      .catch((err) => {
        console.log(err)
        setError('Error fetching data, please try again later')
        setLoading(false);
      });
    }, []);

  useEffect(() => {
    const splashTimeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(splashTimeout);
  }, []);
  


  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      {loading ?
      (<SplashPage />) :
      error ?
      (<ErrorComponent errorMessage={error} /> ) :
(     <>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
      </>
)
      }
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
