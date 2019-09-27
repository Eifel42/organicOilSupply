// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const SupplyChain = artifacts.require('SupplyChain');
const truffleAssert = require('truffle-assertions');

contract('SupplyChain', function (accounts) {

  const productionID = 1;
  const orginOwnerID = accounts[0];
  const farmerID = accounts[1];
  const millID = accounts[2];
  const shopID = accounts[3];
  const customerID = accounts[4];
  const unkownID = accounts[9];

  // Farm Test Data
  const farmerName = "Eifel Gold Oil Farm";
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


  const bottlePrice = web3.utils.toWei('1', 'ether');

  /* let productID = sku + upc;

   */
  const emptyAddress = '0x00000000000000000000000000000000000000';

  console.log("ganache-cli accounts used here...");
  console.log("Contract Owner: accounts[0] ", orginOwnerID);
  console.log("Farmer: accounts[1] ", farmerID);
  console.log("Mill: accounts[2] ", millID);
  console.log("Shop: accounts[3] ", shopID);
  console.log("Costumer: accounts[4] ", customerID);
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

    truffleAssert.reverts(supplyChain.harvest(productionID, farmerID, farmerName, harvestTime, fieldName,
      latitude, longitude, {from: unkownID}), null, 'Unkown can harvest!!');

     await supplyChain.harvest(productionID, farmerID, farmerName, harvestTime, fieldName,
      latitude, longitude, {from: farmerID});

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

    truffleAssert.reverts(supplyChain.press(productionID, millID, millName, amountLiters, pressTime,
      {from: unkownID}), null, 'Unkown can press!!');

    await supplyChain.press(productionID, millID, millName, amountLiters, pressTime, {from: millID});

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

    truffleAssert.reverts(supplyChain.bottling(productionID, bottlingTime,
      {from: unkownID}), null, 'Unkown can press!!');

    await supplyChain.bottling(productionID, bottlingTime, {from: millID});

    // Retrieve farm data from oil production
    const result = await supplyChain.fetchOilProduction.call(productionID, {from: callerID});

    // Verify the result set
    assert.equal(result[0], millID, 'Error: Missing or Invalid ownerID, Miller is Owner of the OilProduction');
    assert.equal(result[1], millID, 'Error: Missing or Invalid millID');
    assert.equal(result[3], millName, 'Error: Missing or Invalid millName');
    assert.equal(result[4], pressTime, 'Error: Missing or Invalid pressTime');
    assert.equal(result[5], amountLiters, 'Error: Missing or Invalid amountLiters');
    assert.equal(result[6], bottlingTime, 'Error: Missing or Invalid bottlingDate');
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

    truffleAssert.reverts(supplyChain.deliver(productionID, shopID, deliverTime,
      {from: shopID}), null, 'Unkown can deliver!!');

    await supplyChain.deliver(productionID, shopID, deliverTime, {from: millID});

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

    truffleAssert.reverts(supplyChain.getDelivery(productionID, shopTime, bottlePrice,
      {from: unkownID}), null, 'Unkown can put into shop!!');

    await supplyChain.getDelivery(productionID, shopTime, bottlePrice, {from: shopID});

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
  it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
    const supplyChain = await SupplyChain.deployed()

    // Declare and Initialize a variable for event


    // Watch the emitted event Shipped()


    // Mark an item as Sold by calling function buyItem()


    // Retrieve the just now saved item from blockchain by calling function fetchItem()


    // Verify the result set

  });

  // 7th Test
  it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
    const supplyChain = await SupplyChain.deployed()

    // Declare and Initialize a variable for event


    // Watch the emitted event Received()


    // Mark an item as Sold by calling function buyItem()


    // Retrieve the just now saved item from blockchain by calling function fetchItem()


    // Verify the result set

  })

  // 8th Test
  it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
    const supplyChain = await SupplyChain.deployed()

    // Declare and Initialize a variable for event


    // Watch the emitted event Purchased()


    // Mark an item as Sold by calling function buyItem()


    // Retrieve the just now saved item from blockchain by calling function fetchItem()


    // Verify the result set

  })

  // 9th Test
  it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()


    // Verify the result set:

  })

  // 10th Test
  it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()


    // Verify the result set:

  })

});

