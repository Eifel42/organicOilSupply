import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function PressOil(props) {

  const {drizzle, addAlert} = props;
  const contract = drizzle && drizzle.contracts.SupplyChain;

  const [millID, setMillID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [millName, setMillName] = useState("Endert Eifel Gold Mill");
  const [pressDate, setPressDate] = useState(Date.now());
  const [amountliters, setAmountLiters] = useState("10");

  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 1) {
      setMillID(accounts[2]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const pressOil = async () => {
    if (contract) {
       const pressMethod =  contract.methods["press"];
       try {
          const stackID = await pressMethod.cacheSend(
            oilProductionID,
            millID,
            millName,
            amountliters,
            pressDate,
            {from: millID});

          let state = drizzle.store.getState();
          if (state.transactionStack[stackID]) {
              const txHash = state.transactionStack[stackID]
              addAlert(`pressOil OilProductionID ${oilProductionID} - Tx Hash : ${txHash}`, 'success');
           }

       } catch (err) {
          addAlert(err.message, 'danger')
      }
    }
  };

  const addMill = async () => {
    if (contract) {
      const addMill =  contract.methods["addMill"];
      try {
        const stackID = await addMill.cacheSend(
          millID, {from: millID});

        let state = drizzle.store.getState();
        if (state.transactionStack[stackID]) {
          const txHash = state.transactionStack[stackID]
          addAlert(`add Mill ${stackID} - Tx Hash : ${txHash}`, 'success');
        }

      } catch (err) {
        addAlert(err.message, 'danger')
      }
    }
  };


  return (
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
  );

}

export default PressOil;
