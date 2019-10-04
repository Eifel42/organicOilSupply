import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Drizzle, generateStore } from "@drizzle/store";
import SupplyChain from "./contracts/SupplyChain";
import { DrizzleContext } from "@drizzle/react-plugin";

const options = {
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [SupplyChain],
  events: {
    SupplyChain: ["TransferOwnership","FarmerAdded","MillAdded","ShopAdded","CustomerAdded","Harvested","Pressed","Bottled","Delivered", "InShop","Sold"],
  },
  polls: {
    accounts: 1500,
    blocks: 1500,
  },
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<DrizzleContext.Provider drizzle={drizzle}>
  <App />
</DrizzleContext.Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
