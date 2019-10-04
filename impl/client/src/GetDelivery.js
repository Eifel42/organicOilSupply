import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ProcessUtil from "./ProcessUtil";

function Delivery(props) {

  const {drizzle, addAlert} = props;

  const [shopID, setShopID] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [inShopDate, setInShopDate] = useState("");
  const [price, setPrice] = useState("2");
  const [ownerID, setOwnerID] = useState("");
  const supplyChain = drizzle.contracts.SupplyChain;


  // Set the Address Fields to default addresses
  useEffect(() => {
    const {accounts} = props;
    if (accounts.length > 0) {
      setOwnerID(accounts[0])
      setShopID(accounts[3]);
    }
  }, [props]);


  // An authority can officially endorse the certification scheme as approved
  const getDelivery = async () => {
    const inShopTime = ProcessUtil.parseDate(inShopDate);
    supplyChain.methods.getDelivery(
      oilProductionID, inShopTime, price, shopID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
      addAlert(`getDeliver OilProductionID ${oilProductionID}  Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function (err) {
      addAlert(err.message, 'danger');
    });
  };

  const addShop = async () => {
    supplyChain.methods.addShop(
      shopID).send({from: ownerID, gas: ProcessUtil.gasPerTransaction()}).then(function(result) {
      addAlert(`addShop ${shopID} - Tx Hash : ${result.transactionHash}`, 'success');
    }).catch(function(err) {
      addAlert(err.message,'danger');
    });

  };
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Shop Account</Form.Label>
          <FormControl
            value={shopID}
            onChange={(i) => setShopID(i.target.value)}
          />
          <Form.Label>Oil Production ID</Form.Label>
          <FormControl
            value={oilProductionID}
            onChange={(i) => setOilProductionID(i.target.value)}
          />
          <Form.Label>InShop Date</Form.Label>
          <FormControl
            type='date'
            value={inShopDate}
            onChange={(i) => setInShopDate(i.target.value)}
          />
          <Form.Label>Price per bottle</Form.Label>
          <FormControl
            value={price}
            onChange={(i) => setPrice(i.target.value)}
          />

          <hr/>
          <Button variant="primary" onClick={addShop}>
            add Shop
          </Button>
          &nbsp;&nbsp;
          <Button variant="primary" onClick={getDelivery}>
            Get Delivery
          </Button>
        </Form.Group>
      </Form>
    </>
  );

}

export default Delivery;
