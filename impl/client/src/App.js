import React from 'react';

import './App.css';
import { DrizzleContext } from "drizzle-react";
import BusinessProcess from "./BusinessProcess";


function App() {

    return (
        <DrizzleContext.Consumer>
            {({drizzle}) =>

                <BusinessProcess drizzle={drizzle} />
            }
        </DrizzleContext.Consumer>
    );
}

export default App;
