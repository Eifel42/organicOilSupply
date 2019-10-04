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
  const [upc,setUPC] = useState("");
  const [sku,setSKU] = useState("");
  const [productID,setProductID] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [millID, setMillID] = useState("");
  const [shopID, setShopID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [bottleDate, setBottleDate] = useState("");
  const [inShopDate, setInShopDate] = useState("");
  const [sellDate,setSellDate] = useState("");
  const [oilProductionID, setOilProductionID] = useState("1");
  const [price,setPrice] = useState("");
  const [bottleState, setBottleState] = useState("");

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

    supplyChain.methods.fetchBottle(upc).call(
      {from: accountID, gas: ProcessUtil.gasPerTransaction()}).then(function (result) {
        addAlert(`fetchBottle ${upc}`, 'success');

        const bottleDate = ProcessUtil.convertDateToString(result[6]);
        const inShopDate = ProcessUtil.convertDateToString(result[7]);
        const sellDate = ProcessUtil.convertDateToString(result[8]);
        const bottleState = ProcessUtil.stateText(result[11]);

        setSKU(result[0]);
        setProductID(result[1]);
        setOwnerID(result[2]);
        setMillID(result[3]);
        setShopID(result[4]);
        setCustomerID(result[5]);
        setBottleDate(bottleDate);
        setInShopDate(inShopDate);
        setSellDate(sellDate);
        setOilProductionID(result[9])
        setPrice(result[10])
        setBottleState(bottleState);

    }).catch(function (err) {
      addAlert(err.message, 'danger');
    });

  };


  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>UPC</Form.Label>
          <FormControl
            value={upc}
            onChange={(i) => setUPC(i.target.value)}
          />
          <hr/>
          <Button variant="primary" onClick={fetchFarm}>
            search
          </Button>
          <hr/>
          <Form.Label>Owner Address of OilProduction</Form.Label>
          <FormControl
            value={ownerID}
            readOnly={true}
            onChange={(i) => setOwnerID(i.target.value)}
          />
          <Form.Label>Mill Address</Form.Label>
          <FormControl
            value={millID}
            readOnly={true}
            onChange={(i) => setMillID(i.target.value)}
          />
          <Form.Label>Shop Address</Form.Label>
          <FormControl
            value={shopID}
            readOnly={true}
            onChange={(i) => setShopID(i.target.value)}
          />
          <Form.Label>Customer Adress</Form.Label>
          <FormControl
            value={customerID}
            readOnly={true}
            onChange={(i) => setCustomerID(i.target.value)}
          />
          <Form.Label>SKU</Form.Label>
          <FormControl
            value={sku}
            readOnly={true}
            onChange={(i) => setSKU(i.target.value)}
          />
          <Form.Label>ProductID</Form.Label>
          <FormControl
            value={productID}
            readOnly={true}
            onChange={(i) => setProductID(i.target.value)}
          />
          <Form.Label>Bottling Date</Form.Label>
          <FormControl
            value={bottleDate}
            readOnly={true}
            onChange={(i) => setBottleDate(i.target.value)}
          />
          <Form.Label>Get Delivery on</Form.Label>
          <FormControl
            value={inShopDate}
            readOnly={true}
            onChange={(i) => setSellDate(i.target.value)}
          />
          <Form.Label>Sell Date</Form.Label>
          <FormControl
            value={sellDate}
            readOnly={true}
            onChange={(i) => setSellDate(i.target.value)}
          />
          <Form.Label>OilProductionID</Form.Label>
          <FormControl
            value={oilProductionID}
            readOnly={true}
            onChange={(i) => setOilProductionID(i.target.value)}
          />
          <Form.Label>Price</Form.Label>
          <FormControl
            value={price}
            readOnly={true}
            onChange={(i) => setPrice(i.target.value)}
          />
          <Form.Label>Bottle State</Form.Label>
          <FormControl
            value={bottleState}
            readOnly={true}
            onChange={(i) => setBottleState(i.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );

}

export default FetchFarm;
