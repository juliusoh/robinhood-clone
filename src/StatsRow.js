import React from 'react';
import './StatsRow.css';
import StockSVG from './stock.svg';
import { db } from './FireBase.js';
import {
  collection,
  documentId,
  getDocs,
  where,
  query,
  set,
  ref,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';

const StatsRow = (props) => {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = async () => {
    const q = await query(
      collection(db, 'myStocks'),
      where('ticker', '==', props.name)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // simply update the record
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          shares: doc.data().shares+=1
        });
        // doc.data() is never undefined for query doc snapshots
        console.log(doc, doc.id, ' => ', doc.data());
      });
    } else {
      // add a new record
      console.log('Not Available');
    }
  };
  return (
    <div className="row" onClick={() => buyStock()}>
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares && props.shares + ' shares'}</p>
      </div>
      <div className="row__chart">
        <img src={StockSVG} height={16} />
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p className="row__percentage"> +{Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default StatsRow;
