import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function Harvest(props) {

  const {drizzle, addAlert, supplyChain} = props;

  const [farmerID, setFarmerID] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [farmerName, setFarmerName] = useState("Eifel Gold Harvest");
  const [harvestDate, setHarvestDate] = useState(Date.now());
  const [fieldName, setFieldName] = useState("slate west field");
  const [latitude, setLatitude] = useState("50.223206");
  const [longitude, setLongitude] = useState("7.084896");
  const state = drizzle.store.getState();


  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 1) {
      setFarmerID(accounts[1]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const harvest = async () => {
    addAlert("drinn",'success');

    if (state.drizzleStatus.initialized) {

      try {
        const stackID = drizzle.contracts.SupplyChain.methods["harvest"].cacheSend(
          oilProductionID,
          farmerID,
          farmerName,
          harvestDate,
          fieldName,
          latitude,
          longitude,
          {from: farmerID});

        addAlert(stackID,'success');
          const txHash = await state.transactionStack[stackID];
        addAlert(JSON.stringify(state.transactionStack),'success');
          if (txHash) {
            const status = state.transactions[txHash].status;
            addAlert(`harvest OilProductionID ${oilProductionID} - Tx Hash : ${status}`, 'success');
          }

      } catch (err) {
        addAlert(err.message, 'danger')
      }
    } else {
      addAlert("no action",'danger');
    }
  };

  const addFarm = async () => {
    if (supplyChain) {
      const addFarmer = supplyChain.methods["addFarmer"];
      try {
        const stackID = await addFarmer.cacheSend(
          farmerID, {from: farmerID});

        const txHash = state.transactionStack[stackID];
        if (txHash) {
          const status = state.transactions[txHash].status;
          addAlert(`Add FarmerRole ${stackID} - Tx Hash : ${status}`, 'success');
        }

      } catch (err) {
        addAlert(err.message, 'danger')
      }
    }
  };


  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Farmer Account</Form.Label>
          <FormControl
            value={farmerID}
            onChange={(i) => setFarmerID(i.target.value)}
          />
          <Form.Label>Oil Production ID</Form.Label>
          <FormControl
            value={oilProductionID}
            onChange={(i) => setOilProductionID(i.target.value)}
          />
          <Form.Label>Farmer Name</Form.Label>
          <FormControl
            value={farmerName}
            onChange={(i) => setFarmerName(i.target.value)}
          />
          <Form.Label>Harvest Date</Form.Label>
          <Form.Control
            value={harvestDate}
            onChange={(i) => setHarvestDate(i.target.value)}
          />
          <Form.Label>Field Name</Form.Label>
          <FormControl
            value={fieldName}
            onChange={(i) => setFieldName(i.target.value)}
          />
          <Form.Label>Latitude</Form.Label>
          <FormControl
            value={latitude}
            onChange={(i) => setLatitude(i.target.value)}
          />
          <Form.Label>Longitude</Form.Label>
          <FormControl
            value={longitude}
            onChange={(i) => setLongitude(i.target.value)}
          />
          <hr/>
          <Button variant="primary" onClick={addFarm}>
            add Farmer Role
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={harvest}>
            Harvest
          </Button>
          <hr/>

        </Form.Group>


      </Form>
    </>
  );

}

export default Harvest;
