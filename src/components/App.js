import React, { useState, useEffect } from "react";
import axios from "axios";

import Charts from "./Charts";
import Navbar from "./Navbar";
import ErrorComponent from "./ErrorComponent.js";
import LoadingPage from "./LoadingPage.js";

import useDarkMode from '../hooks/useDarkMode.js'

import "../styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useDarkMode(false);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Setting loading to true');
  }, []);
  
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
    console.log('Setting loading to false');
    axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
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
    }, 2550);
          return () => clearTimeout(loadingTimeout);
    }, []);


  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      {loading ?
      (<LoadingPage />) :
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

export default App