// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const SupplyChain = artifacts.require('SupplyChain');
const truffleAssert = require('truffle-assertions');

contract('SupplyChain', function (accounts) {

  const productionID = 1;
  const upc = 1;
  const orginOwnerID = accounts[0];
  const farmerID = accounts[1];
  const millID = accounts[2];
  const shopID = accounts[3];
  const customerID = accounts[4];
  const unkownID = accounts[9];

  // Harvest Test Data
  const farmerName = "Eifel Gold Oil Harvest";
  const fieldName = "Goldfield";
  const latitude = "-38.239770";
  const longitude = "144.341490";

  // Mill Test Data
  const millName = "Eifel Small River Mill";
  const amountLiters = "10";
  const harvestTime = Date.now();
  const pressTime = Date.now() + 10000;
  const bottlingTime = Date.now() + 20000;
  const deliverTime = Date.now() + 30000;
  const shopTime = Date.now() + 40000;
  const sellTime = Date.now() + 50000;

  // payment
  const bottlePrice = web3.utils.toWei('1.99', 'ether');
  const payment = web3.utils.toWei('3', 'ether');

  console.log("ganache-cli accounts used here...");
  console.log("Contract Owner: accounts[0] ", orginOwnerID);
  console.log("Farmer: accounts[1] ", farmerID);
  console.log("Mill: accounts[2] ", millID);
  console.log("Shop: accounts[3] ", shopID);
  console.log("Customer: accounts[4] ", customerID);
  console.log("Unkown: accounts[9] ", unkownID);

  // 1st Test
  it("Testing smart contract function harvest that allows a farmer to harvest the seed", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    await supplyChain.addFarmer(farmerID, {from: callerID});

    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.Harvested({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.harvest(productionID, unkownID, farmerName, harvestTime, fieldName,
      latitude, longitude, {from: unkownID}), null, 'Unkown can harvest!!');

     await supplyChain.harvest(productionID, farmerID, farmerName, harvestTime, fieldName,
      latitude, longitude, {from: callerID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProductionFarm.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], farmerID, 'Error: Missing or Invalid ownerID, Farmer is Owner of the OilProduction');
    assert.equal(result[1], farmerID, 'Error: Missing or Invalid farmerID');
    assert.equal(result[2], farmerName, 'Error: Missing or Invalid farmerName');
    assert.equal(result[3], harvestTime, 'Error: Missing or Invalid harvestTime');
    assert.equal(result[4], fieldName, 'Error: Missing or Invalid fieldName');
    assert.equal(result[5], latitude, 'Error: Missing or Invalid latitude');
    assert.equal(result[6], longitude, 'Error: Missing or Invalid longitude');
    assert.equal(result[7], 0, 'Error: Invalid OilProduction State');
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });


  // 2nd Test
  it("Testing the smart contract function press that allows a miller to press oil", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    await supplyChain.addMill(millID, {from: callerID});

    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.Pressed({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.press(productionID, unkownID, millName, amountLiters, pressTime,
      {from: unkownID}), null, 'Unkown can press!!');

    await supplyChain.press(productionID, millID, millName, amountLiters, pressTime, {from: callerID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], millID, 'Error: Missing or Invalid ownerID, Miller is Owner of the Oilproduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[10], 1, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });

  // 3rd Test
  it("Testing the smart contract function bottling that enables a miller to bottle the oil", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.Bottled({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.bottling(productionID, bottlingTime, unkownID,
      {from: unkownID}), null, 'Unkown can press!!');

    await supplyChain.bottling(productionID, bottlingTime, millID, {from: callerID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], millID, 'Error: Missing or Invalid ownerID, Miller is Owner of the OilProduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(result[9], 10, 'Error: Missing or Invalid bottleCounts');
    assert.equal(result[10], 2, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Invalid event emitted OilProduction');

    // fetch last bottle of the oil Production
    const bottleResult = await supplyChain.fetchBottle.call(result[9] - 1, {from: callerID});
    assert.equal(bottleResult[2], millID, 'Error: Bottle owner ist not Miller');
    assert.equal(bottleResult[3], millID, 'Error: Missing or Invalid millID');
    assert.equal(bottleResult[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[9], productionID, 'Error: Missing or Invalid productionID');
    assert.equal(bottleResult[11], 2, 'Error: Invalid item State Bottle');

  });

  // 4th Test
  it("Testing smart contract function deliver that allows a miller to send the bottles to the shop", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.Delivered({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.deliver(productionID, shopID, deliverTime, unkownID,
      {from: unkownID}), null, 'Unkown can deliver!!');

    await supplyChain.deliver(productionID, shopID, deliverTime, millID, {from: callerID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], shopID, 'Error: Missing or Invalid ownerID, Shop is Owner of the OilProduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[2], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(result[7], deliverTime, 'Error: Missing or Invalid deliverDate');
    assert.equal(result[9], 10, 'Error: Missing or Invalid bottleCounts');
    assert.equal(result[10], 3, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Invalid event emitted OilProduction');

    // fetch last bottle of the oil Production
    const bottleResult = await supplyChain.fetchBottle.call(result[9] - 1, {from: callerID});
    assert.equal(bottleResult[2], shopID, 'Error: Bottle owner ist not shop');
    assert.equal(bottleResult[3], millID, 'Error: Missing or Invalid millID');
    assert.equal(bottleResult[4], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(bottleResult[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[9], productionID, 'Error: Missing or Invalid productionID');
    assert.equal(bottleResult[11], 3, 'Error: Invalid item State Bottle');

  });

  // 5th Test
  it("Testing smart contract function getDelivery that allows the shops to put the bottles into the shop", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    await supplyChain.addShop(shopID, {from: callerID});

    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.InShop({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.getDelivery(productionID, shopTime, bottlePrice, unkownID,
      {from: unkownID}), null, 'Unkown can put into shop!!');

    await supplyChain.getDelivery(productionID, shopTime, bottlePrice, shopID, {from: callerID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], shopID, 'Error: Missing or Invalid ownerID, Shop is Owner of the OilProduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[2], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(result[7], deliverTime, 'Error: Missing or Invalid deliverDate');
    assert.equal(result[8], shopTime, 'Error: Missing or Invalid deliverDate');
    assert.equal(result[9], 10, 'Error: Missing or Invalid bottleCounts');
    assert.equal(result[10], 4, 'Error: Invalid item State');
    assert.equal(eventEmitted, true, 'Invalid event emitted OilProduction');

    // fetch last bottle of the oil Production
    const bottleResult = await supplyChain.fetchBottle.call(result[9] - 1, {from: callerID});
    assert.equal(bottleResult[2], shopID, 'Error: Bottle owner ist not shop');
    assert.equal(bottleResult[3], millID, 'Error: Missing or Invalid millID');
    assert.equal(bottleResult[4], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(bottleResult[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[7], shopTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[9], productionID, 'Error: Missing or Invalid productionID');
    assert.equal(bottleResult[10], bottlePrice, 'Error: Missing or Invalid price');
    assert.equal(bottleResult[11], 4, 'Error: Invalid item State Bottle');
  });

  // 6th Test
  it("Testing smart contract function sellBottle that enables the shop to sell a bottle to the customer", async () => {

    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});
    await supplyChain.addCustomer(customerID, {from: callerID});

    // Declare and Initialize a variable for event
    let eventEmitted = false;

    // Watch the emitted event Harvested()
    let event = await supplyChain.Sold({}, (err, res) => {
      eventEmitted = true;
    });

    truffleAssert.reverts(supplyChain.buyBottle(upc, unkownID, sellTime,
      {from: unkownID}), null, 'Unkown can buy bottle!!');

    await supplyChain.buyBottle(upc, customerID, sellTime, {from: customerID, value: payment});

    // fetch last bottle of the oil Production
    const bottleResult = await supplyChain.fetchBottle.call(upc, {from: callerID});
    assert.equal(bottleResult[2], customerID, 'Error: Bottle owner ist not shop');
    assert.equal(bottleResult[3], millID, 'Error: Missing or Invalid millID');
    assert.equal(bottleResult[4], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(bottleResult[5], customerID, 'Error: Missing or Invalid customerID');

    assert.equal(bottleResult[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[7], shopTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[8], sellTime, 'Error: Missing or Invalid sellDate');
    assert.equal(bottleResult[9], productionID, 'Error: Missing or Invalid productionID');
    assert.equal(bottleResult[10], bottlePrice, 'Error: Missing or Invalid price');
    assert.equal(bottleResult[11], 5, 'Error: Invalid item State Bottle');
    assert.equal(eventEmitted, true, 'Invalid event emitted OilProduction');

  });

  // 7th Test
  it("Testing smart contract function fetchOilProductionFarm", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});

    const result = await supplyChain.fetchOilProductionFarm.call(productionID, {from: callerID});

    assert.equal(result[0], shopID, 'Error: Missing or Invalid ownerID, Shop is Owner of the OilProduction');
    assert.equal(result[1], farmerID, 'Error: Missing or Invalid farmerID');
    assert.equal(result[2], farmerName, 'Error: Missing or Invalid farmerName');
    assert.equal(result[3], harvestTime, 'Error: Missing or Invalid harvestTime');
    assert.equal(result[4], fieldName, 'Error: Missing or Invalid fieldName');
    assert.equal(result[5], latitude, 'Error: Missing or Invalid latitude');
    assert.equal(result[6], longitude, 'Error: Missing or Invalid longitude');
    assert.equal(result[7], 4, 'Error: Invalid OilProduction State');

  });

  // 8th Test
  it("Testing smart contract function fetchOilProduction", async () => {
    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});

    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], shopID, 'Error: Missing or Invalid ownerID, Shop is Owner of the OilProduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[2], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(result[7], deliverTime, 'Error: Missing or Invalid deliverDate');
    assert.equal(result[8], shopTime, 'Error: Missing or Invalid deliverDate');
    assert.equal(result[9], 10, 'Error: Missing or Invalid bottleCounts');
    assert.equal(result[10], 4, 'Error: Invalid item State');

  });

  // 9th Test
  it("Testing smart contract function fetchBottle", async () => {

    const callerID = orginOwnerID;
    const supplyChain = await SupplyChain.deployed({from: callerID});

    const bottleResult = await supplyChain.fetchBottle.call(upc, {from: callerID});
    const sku=(bottleResult[9] * 1000);
    assert.equal(bottleResult[0], sku, 'Error: Missing or Invalid sku');
    assert.equal(bottleResult[1], upc + sku, 'Error: Missing or Invalid productID');

    assert.equal(bottleResult[2], customerID, 'Error: Bottle owner ist not shop');
    assert.equal(bottleResult[3], millID, 'Error: Missing or Invalid millID');
    assert.equal(bottleResult[4], shopID, 'Error: Missing or Invalid shopID');
    assert.equal(bottleResult[5], customerID, 'Error: Missing or Invalid customerID');

    assert.equal(bottleResult[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[7], shopTime, 'Error: Missing or Invalid bottlingDate');
    assert.equal(bottleResult[8], sellTime, 'Error: Missing or Invalid sellDate');
    assert.equal(bottleResult[9], productionID, 'Error: Missing or Invalid productionID');
    assert.equal(bottleResult[10], bottlePrice, 'Error: Missing or Invalid price');
    assert.equal(bottleResult[11], 5, 'Error: Invalid item State Bottle');

  });

});

