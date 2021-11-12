import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Stats.css';
import StatsRow from './StatsRow';
import { db } from './FireBase.js';
import { collection, documentId, getDocs, query } from 'firebase/firestore';

const KEY_URL = `&token=c5sa63aad3ia8bfblc2g`;
const BASE_URL = `https://finnhub.io/api/v1/quote?symbol=`;
// c current price
// d change
// dp percenet change
const Stats = () => {
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);
  console.log('mystocks', myStocks);

  const getMyStocks = async () => {
    let sPromises = [];
    let tempData = [];
    const querySnapshot = await getDocs(collection(db, 'myStocks'));
    querySnapshot.forEach((doc) => {
      sPromises.push(
        getStockData(doc.data().ticker).then((response) => {
          tempData.push({
            id: doc.id,
            data: doc.data(),
            info: response.data,
          });
        })
      );
      Promise.all(sPromises).then(() => {
        console.log(tempData);
        setMyStocks(tempData);
      });
    });
  };

  // let promises = [];
  // let tempStocksData = [];
  // stocksList.map((stock) => {
  //   promises.push(
  //     getStockData(stock).then((response) => {
  //       tempStocksData.push({
  //         name: stock,
  //         ...response.data,
  //       });
  //     })
  //   );
  // });

  // Promise.all(promises).then(() => {
  //   setStockData(tempStocksData);
  // });

  const getStockData = async (stock) => {
    try {
      const response = await axios.get(`${BASE_URL}${stock}${KEY_URL}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error', error.message);
    }
  };
  useEffect(() => {
    getMyStocks();
    const stocksList = [
      'AAPL',
      'BTC',
      'AMC',
      'MSFT',
      'TSLA',
      'FB',
      'BABA',
      'UBER',
      'DIS',
      'SBUX',
    ];

    let promises = [];
    let tempStocksData = [];
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock).then((response) => {
          tempStocksData.push({
            name: stock,
            ...response.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStockData(tempStocksData);
    });
  }, []);

  return (
    <div className="stats">
      {/* container starts */}
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStocks.map((item) => (
              <StatsRow
                key={item.data.ticker}
                name={item.data.ticker}
                openPrice={item.info.o}
                shares={item.data.shares}
                price={item.info.c}
              ></StatsRow>
            ))}
          </div>
        </div>
        <div className="stats__header">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
      {/* container ends */}
    </div>
  );
};

export default Stats;
