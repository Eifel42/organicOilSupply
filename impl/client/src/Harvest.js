import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function Harvest(props) {

  const {drizzle, addAlert} = props;

  const [ownerID, setOwnerID] = useState("");
  const [farmerID, setFarmerID] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [farmerName, setFarmerName] = useState("Eifel Gold Harvest");
  const [harvestDate, setHarvestDate] = useState("");
  const [fieldName, setFieldName] = useState("slate west field");
  const [latitude, setLatitude] = useState("50.223206");
  const [longitude, setLongitude] = useState("7.084896");
  const supplyChain = drizzle.contracts.SupplyChain;

  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setOwnerID(accounts[0])
      setFarmerID(accounts[1]);
    }
  }, [props]);

  // An authority can officially endorse the certification scheme as approved
  const harvest = async () => {

    const harvestTime = ProcessUtil.parseDate(harvestDate);
    supplyChain.methods.harvest(
      oilProductionID,
      farmerID,
      farmerName,
      harvestTime,
      fieldName,
      latitude,
      longitude).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function(result) {
          addAlert(`harvest OilProductionID ${oilProductionID} - Tx Hash : ${result.transactionHash}`, 'success');
      }).catch(function(err) {
          addAlert(err.message,'danger');
      });


  };

  const addFarm = async () => {

    supplyChain.methods.addFarmer(
      farmerID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function(result) {
      addAlert(`addFarmer ${farmerID} - Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function(err) {
      addAlert(err.message,'danger');
    });

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
          <FormControl
            type='date'
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
