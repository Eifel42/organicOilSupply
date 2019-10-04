import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function Delivery(props) {

  const {drizzle, addAlert} = props;

  const [customerID, setCustomerID] = useState("");
  const [upc, setUPC] = useState("1");
  const [sellDate, setSellDate] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("3");
  const supplyChain = drizzle.contracts.SupplyChain;


  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setOwnerID(accounts[0])
      setCustomerID(accounts[4]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const buyBottle = async () => {
    const sellTime = ProcessUtil.parseDate(sellDate);
    supplyChain.methods.buyBottle(
      upc, customerID, sellTime).send({from: ownerID, gas: ProcessUtil.gasPerTransaction(), value: paymentAmount}).then(function (result) {
      addAlert(`buy bottle ${upc}  Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function (err) {
      addAlert(err.message, 'danger');
    });
  };

  const addCustomer = async () => {
    supplyChain.methods.addCustomer(
      customerID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function(result) {
      addAlert(`addCustomer ${customerID} - Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function(err) {
      addAlert(err.message,'danger');
    });

  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Customer Account</Form.Label>
          <FormControl
            value={customerID}
            onChange={(i) => setCustomerID(i.target.value)}
          />
          <Form.Label>UPC</Form.Label>
          <FormControl
            value={upc}
            onChange={(i) => setUPC(i.target.value)}
          />
          <Form.Label>Sell Date</Form.Label>
          <FormControl
            type='date'
            value={sellDate}
            onChange={(i) => setSellDate(i.target.value)}
          />
          <Form.Label>Payment</Form.Label>
          <FormControl
            value={paymentAmount}
            onChange={(i) => setPaymentAmount(i.target.value)}
          />
          <hr/>
          <Button variant="primary" onClick={addCustomer}>
            add Customer
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={buyBottle}>
            Buy Bottle
          </Button>
        </Form.Group>
      </Form>
    </>
  );

}

export default Delivery;
