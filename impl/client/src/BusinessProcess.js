import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from 'react-bootstrap/Alert'
import md5 from 'md5';
import imgField from './img/field.png';
import Accounts from "./Accounts";
import Harvest from "./Harvest";
import PressOil from "./PressOil";
import Bottling from "./Bottling";
import FetchFarm from "./FetchFarm";
import FetchOilProduction from "./FetchOilPorduction";
import Delivery from "./Delivery"
import GetDelivery from "./GetDelivery"
import BuyBottle from "./BuyBottle"
import FetchBottle from "./FetchBottle"

function BusinessProcess(props) {

    // EVM accounts for the Actors
    const [accounts, setAccounts] = useState([]);

     // Tab selection default
    const [key, setKey] = useState('farm');

    const [alerts, setAlerts] = useState([]);

    const {drizzle, drizzleState} = props;

    // When accounts are available, map them as defaults to actors
    useEffect(() => {
        console.log({props})
        if (props && props.drizzle && props.drizzle.web3 && props.drizzle.web3.eth) {
            props.drizzle.web3.eth.getAccounts()
                .then(_accounts => {
                    setAccounts(_accounts);
                });
        }
    }, [props]);


    // Handle alerts
    const removeAlert = (id) => {
        setAlerts(_alerts => _alerts.filter(alert => alert.id !== id));
    };

    const addAlert = (msg, variant) => {
        const id = md5(msg);
        if (!alerts.filter(alert => alert.id === id).length) {
            setAlerts(_alerts => !_alerts.filter(alert => alert.id === id).length && [..._alerts, {id, msg, variant}]);
            setTimeout(() => removeAlert(id), 600000, );
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Jumbotron>
                        <img src={imgField} width="100%" height="50%" alt={"Gold Field"}/>
                        <h1>Organic Oil Manufacturer</h1>
                        <p>Organic oil manufacturer Ethereum Dapp example. It illustrates the supply chain from the farmer to the customer
                        &nbsp;<a href="https://github.com/Eifel42/organicOilSupply/blob/master/uml/uml.md">Business Concept</a>.</p>
                    </Jumbotron>
                </Col>
            </Row>


            <Row>
                <Col>
                  <hr/>
                  <Tabs activeKey={key} onSelect={key => setKey(key)}>
                    <Tab eventKey="harvest" title="Harvest">
                      <Harvest addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState}/>
                    </Tab>
                    <Tab eventKey="pressOil" title="PressOil">
                      <PressOil addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                               drizzleState={drizzleState}/>
                    </Tab>
                    <Tab eventKey="bottling" title="Bottling">
                      <Bottling addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState}/>
                    </Tab>
                    <Tab eventKey="delivery" title="Deliver">
                      <Delivery addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="getDelivery" title="Get Delivery">
                      <GetDelivery addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="buyBottle" title="Buy Bottle">
                      <BuyBottle addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                   drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="fetchFarm" title="Farm Data">
                      <FetchFarm addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="fetchOilProduction" title="Oil Prod. Data">
                      <FetchOilProduction addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                 drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="fetchBottle" title="Bottle Data">
                      <FetchBottle addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                   drizzleState={drizzleState} />
                    </Tab>
                    <Tab eventKey="accounts" title="Accounts">
                      <Accounts addAlert={addAlert} accounts={accounts} drizzle={drizzle}
                                drizzleState={drizzleState} />
                    </Tab>
                  </Tabs>
                </Col>
            </Row>

            <Row>
                <Col>
                    <hr/>
                    <h3>Transaction History</h3>
                    {alerts.length === 0 ?
                        <div>No recent updates</div>
                        :
                        alerts.reverse().map(alert =>
                            <Alert key={alert.id} variant={alert.variant}>
                                {typeof alert.msg == 'object' ? JSON.stringify(alert.msg)
                                    : alert.msg
                                }
                            </Alert>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )

}

export default BusinessProcess;
