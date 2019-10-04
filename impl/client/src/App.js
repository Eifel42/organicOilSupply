import './App.css';
import React from "react";
import BusinessProcess from "./BusinessProcess";
import { DrizzleContext } from "@drizzle/react-plugin";

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
         return "<h1>Loading...</h1> " +
          "<p>If loading needs more then a minute, please checks if the contracts are deployed on your network</p>";
      }

      return (
        <BusinessProcess drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
)
