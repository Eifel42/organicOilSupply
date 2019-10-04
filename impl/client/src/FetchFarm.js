import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"
import ProcessUtil from "./ProcessUtil";

/**
 * @return {boolean}
 */
function FetchFarm(props) {

  const {drizzle, addAlert} = props;

  const [accountID, setAccountID] = useState("1");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [farmerAddress, setFarmerAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [productionState, setProductionState] = useState("");
  const supplyChain = drizzle.contracts.SupplyChain;

  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setAccountID(accounts[0]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const fetchFarm = async () => {

    supplyChain.methods.fetchOilProductionFarm(oilProductionID).call(
      {from: accountID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
        addAlert(`fetchOilProductionFarm ${oilProductionID}`, 'success');

        const harvestDate = ProcessUtil.convertDateToString(result[3]);
        const prodState = ProcessUtil.stateText(result[7]);

        setOwnerAddress(result[0]);
        setFarmerAddress(result[1]);
        setFarmerName(result[2]);
        setHarvestDate(harvestDate);
        setFieldName(result[4]);
        setLatitude(result[5]);
        setLongitude(result[6]);
        setProductionState(prodState);

    }).catch(function (err) {
      addAlert(err.message, 'danger');
    });

  };


  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Oil Production ID</Form.Label>
          <FormControl
            value={oilProductionID}
            onChange={(i) => setOilProductionID(i.target.value)}
          />
          <hr/>
          <Button variant="primary" onClick={fetchFarm}>
            search
          </Button>
          <hr/>
          <Form.Label>Owner Address of OilProduction</Form.Label>
          <FormControl
            value={ownerAddress}
            readOnly={true}
            onChange={(i) => setOwnerAddress(i.target.value)}
          />
          <Form.Label>Farmer Address</Form.Label>
          <FormControl
            value={farmerAddress}
            readOnly={true}
            onChange={(i) => setFarmerAddress(i.target.value)}
          />
          <Form.Label>Farmer Name</Form.Label>
          <FormControl
            value={farmerName}
            readOnly={true}
            onChange={(i) => setFarmerName(i.target.value)}
          />
          <Form.Label>Harvest Date</Form.Label>
          <FormControl
            value={harvestDate}
            readOnly={true}
            onChange={(i) => setHarvestDate(i.target.value)}
          />
          <Form.Label>Field Name</Form.Label>
          <FormControl
            value={fieldName}
            readOnly={true}
            onChange={(i) => setFieldName(i.target.value)}
          />
          <Form.Label>Latitude</Form.Label>
          <FormControl
            value={latitude}
            readOnly={true}
            onChange={(i) => setLatitude(i.target.value)}
          />
          <Form.Label>Longitude</Form.Label>
          <FormControl
            value={longitude}
            readOnly={true}
            onChange={(i) => setLongitude(i.target.value)}
          />
          <Form.Label>Production State</Form.Label>
          <FormControl
            value={productionState}
            readOnly={true}
            onChange={(i) => setProductionState(i.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );

}

export default FetchFarm;
