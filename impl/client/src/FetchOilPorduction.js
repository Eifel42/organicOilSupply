import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"
import ProcessUtil from './ProcessUtil';

/**
 * @return {boolean}
 */
function FetchFarm(props) {

  const {drizzle, addAlert} = props;

  const [accountID, setAccountID] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [millAddress, setMillAddress] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [millName, setMillName] = useState("");
  const [pressDate, setPressDate] = useState("");
  const [amountLiters, setAmountLiters] = useState("");
  const [bottlingDate, setBottlingDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [inShopDate, setInShopDate] = useState("");
  const [bottleCount, setBottleCount] = useState("");
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

    supplyChain.methods.fetchOilProduction(oilProductionID).call(
      {from: accountID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
        addAlert(`fetchOilProductionFarm ${oilProductionID}`, 'success');


        const pressDate = ProcessUtil.convertDateToString(result[4]);
        const bottlingDate = ProcessUtil.convertDateToString(result[6]);
        const deliveryDate = ProcessUtil.convertDateToString(result[7]);
        const inShopDate = ProcessUtil.convertDateToString(result[8]);
        const prodState = ProcessUtil.stateText(result[10]);

        setOwnerAddress(result[0]);
        setMillAddress(result[1]);
        setShopAddress(result[2]);
        setMillName(result[3]);
        setPressDate(pressDate);
        setAmountLiters(result[5]);
        setPressDate(pressDate);
        setBottlingDate(bottlingDate);
        setDeliveryDate(deliveryDate);
        setInShopDate(inShopDate);
        setBottleCount(result[9]);
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
          <Form.Label>Mill Address</Form.Label>
          <FormControl
            value={millAddress}
            readOnly={true}
            onChange={(i) => setMillAddress(i.target.value)}
          />
          <Form.Label>Shop Address</Form.Label>
          <FormControl
            value={shopAddress}
            readOnly={true}
            onChange={(i) => setShopAddress(i.target.value)}
          />
          <Form.Label>Mill Name</Form.Label>
          <FormControl
            value={millName}
            readOnly={true}
            onChange={(i) => setMillName(i.target.value)}
          />
          <Form.Label>Press Date</Form.Label>
          <FormControl
            value={pressDate}
            readOnly={true}
            onChange={(i) => setPressDate(i.target.value)}
          />
          <Form.Label>Pressed oil in liters</Form.Label>
          <FormControl
            value={amountLiters}
            readOnly={true}
            onChange={(i) => setAmountLiters(i.target.value)}
          />
          <Form.Label>Bottling Date</Form.Label>
          <FormControl
            value={bottlingDate}
            readOnly={true}
            onChange={(i) => setBottlingDate(i.target.value)}
          />
          <Form.Label>Delivery Date</Form.Label>
          <FormControl
            value={deliveryDate}
            readOnly={true}
            onChange={(i) => setDeliveryDate(i.target.value)}
          />
          <Form.Label>InShop Date</Form.Label>
          <FormControl
            value={inShopDate}
            readOnly={true}
            onChange={(i) => setInShopDate(i.target.value)}
          />
          <Form.Label>Numbers of Bottles</Form.Label>
          <FormControl
            value={bottleCount}
            readOnly={true}
            onChange={(i) => setBottleCount(i.target.value)}
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
