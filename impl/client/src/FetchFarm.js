import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

/**
 * @return {boolean}
 */
function FetchFarm(props) {

  const {drizzle, addAlert} = props;

  const [accountID, setAccountID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [farmData, setFarmData] = useState("No Data");

  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 1) {
      setAccountID(accounts[1]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const fetchFarm = async () => {

    try {
      const result = await drizzle.contracts.SupplyChain.methods.fetchOilProductionFarm(oilProductionID).call({from: accountID});
      setFarmData(JSON.stringify(result));

      addAlert("Read " + result[2], 'success')
    } catch (err) {
      addAlert(err.message, 'danger')
    }
    
  };


  return (
    <Form>
      <Form.Group>
        <Form.Label>Account ID</Form.Label>
        <FormControl
          value={accountID}
          onChange={(i) => setAccountID(i.target.value)}
        />
        <Form.Label>Oil Production ID</Form.Label>
        <FormControl
          value={oilProductionID}
          onChange={(i) => setOilProductionID(i.target.value)}
        />
        <hr/>
        <Button variant="primary" onClick={fetchFarm}>
          farm
        </Button>
        <hr/>
        <Col>{farmData}</Col>
      </Form.Group>
    </Form>

  );

}

export default FetchFarm;
