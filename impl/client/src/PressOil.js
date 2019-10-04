import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function PressOil(props) {

  const {drizzle, addAlert} = props;

  const [millID, setMillID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [millName, setMillName] = useState("Endert Eifel Gold Mill");
  const [pressDate, setPressDate] = useState("");
  const [amountliters, setAmountLiters] = useState("10");
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
  const pressOil = async () => {

    const pressTime = ProcessUtil.parseDate(pressDate);
    supplyChain.methods.press(
      oilProductionID,
      millID,
      millName,
      amountliters,
      pressTime).send({from: millID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
         addAlert(`pressOIl OilProductionID ${oilProductionID} - Tx Hash : ${result.transactionHash}`, 'success');
      }).catch(function (err) {
         addAlert(err.message, 'danger');
      });
  };

  const addMill = async () => {
    supplyChain.methods.addMill(millID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
        addAlert(`addMill ${millID} - Tx Hash : ${result.transactionHash}`, 'success');
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
          <Form.Label>Mill Name</Form.Label>
          <FormControl
            value={millName}
            onChange={(i) => setMillName(i.target.value)}
          />
          <Form.Label>amountLiters</Form.Label>
          <FormControl
            value={amountliters}
            onChange={(i) => setAmountLiters(i.target.value)}
          />
          <Form.Label>pressDate</Form.Label>
          <FormControl
            type='date'
            value={pressDate}
            onChange={(i) => setPressDate(i.target.value)}
          />

          <hr/>
          <Button variant="primary" onClick={addMill}>
            add Mill Role
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={pressOil}>
            Press Oil
          </Button>
        </Form.Group>


      </Form>
    </>
  );

}

export default PressOil;
