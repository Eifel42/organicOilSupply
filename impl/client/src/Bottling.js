import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Bottling(props) {

  const {drizzle, addAlert} = props;
  const contract = drizzle && drizzle.contracts.SupplyChain;

  const [millID, setMillID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [bottlingDate, setBottlingDate] = useState(Date.now());

  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 1) {
      setMillID(accounts[2]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const bottling = async () => {
    if (contract) {
       const bottlingMethod =  contract.methods["bottling"];
       try {
          const stackID = bottlingMethod.cacheSend(
            oilProductionID,
            bottlingDate,
            {from: millID});

          let state = drizzle.store.getState();
          if (state.transactionStack[stackID]) {
              const txHash = state.transactionStack[stackID]
              addAlert(`bottling OilProductionID ${oilProductionID} - Tx Hash : ${txHash}`, 'success');
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
        <Form.Label>Bottling Date</Form.Label>
        <FormControl
          value={bottlingDate}
          onChange={(i) => setBottlingDate(i.target.value)}
        />

        <hr/>
        <Button variant="primary" onClick={bottling}>
          Bottling
        </Button>
      </Form.Group>


    </Form>
  );

}

export default Bottling;
