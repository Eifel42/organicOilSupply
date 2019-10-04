import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function Bottling(props) {

  const {drizzle, addAlert} = props;

  const [millID, setMillID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [bottlingDate, setBottlingDate] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const supplyChain = drizzle.contracts.SupplyChain;


  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setOwnerID(accounts[0])
      setMillID(accounts[2]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const bottling = async () => {
    const bottlingTime = ProcessUtil.parseDate(bottlingDate);
    supplyChain.methods.bottling(
      oilProductionID,
      bottlingTime, millID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
      addAlert(`bottling OilProductionID ${oilProductionID} - Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function (err) {
      addAlert(err.message, 'danger');
    });
  };


  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Mill Account</Form.Label>
          <FormControl
            value={millID}
            onChange={(i) => setMillID(i.target.value)}
          />
          <Form.Label>Oil Production ID</Form.Label>
          <FormControl
            value={oilProductionID}
            onChange={(i) => setOilProductionID(i.target.value)}
          />
          <Form.Label>Bottling Date</Form.Label>
          <FormControl
            type='date'
            value={bottlingDate}
            onChange={(i) => setBottlingDate(i.target.value)}
          />

          <hr/>
          <Button variant="primary" onClick={bottling}>
            Bottling
          </Button>
        </Form.Group>
      </Form>
    </>
  );

}

export default Bottling;
