import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function Delivery(props) {

  const {drizzle, addAlert} = props;

  const [millID, setMillID] = useState("");
  const [shopID, setShopID] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const supplyChain = drizzle.contracts.SupplyChain;


  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setOwnerID(accounts[0])
      setMillID(accounts[2]);
      setShopID(accounts[3]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const deliver = async () => {
    const deliveryTime = ProcessUtil.parseDate(deliveryDate);
    supplyChain.methods.deliver(
      oilProductionID,
      shopID,
      deliveryTime, millID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
      addAlert(`deliver OilProductionID ${oilProductionID} to shop- Tx Hash : ${result.transactionHash}`, 'success');
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
          <Form.Label>Send to Shop</Form.Label>
          <FormControl
            value={shopID}
            onChange={(i) => setShopID(i.target.value)}
          />
          <Form.Label>Delivery Date</Form.Label>
          <FormControl
            type='date'
            value={deliveryDate}
            onChange={(i) => setDeliveryDate(i.target.value)}
          />

          <hr/>
          <Button variant="primary" onClick={deliver}>
            Deliver
          </Button>
        </Form.Group>
      </Form>
    </>
  );

}

export default Delivery;
