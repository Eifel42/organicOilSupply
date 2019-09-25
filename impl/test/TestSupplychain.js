// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const SupplyChain = artifacts.require('SupplyChain');
const truffleAssert = require('truffle-assertions');

contract('SupplyChain', function(accounts) {

    // Declare few constants and assign a few sample accounts generated by ganache-cli
    let sku = 1;
    let upc = 1;

    const productionID = 1;
    const ownerID = accounts[0];
    const farmerID = accounts[1];
    const farmerName = "Eifel Gold";
    const fieldName = "Goldfield";
    const latitude = "-38.239770";
    const longitude = "144.341490";


   /* let productID = sku + upc;
    const productNotes = "Best beans for Espresso";
    const productPrice = web3.toWei(1, "ether");
    const distributorID = accounts[2];
    const retailerID = accounts[3];
    const consumerID = accounts[4];
    */
    const emptyAddress = '0x00000000000000000000000000000000000000';

    console.log("ganache-cli accounts used here...");
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("Farmer: accounts[1] ", accounts[1]);
    console.log("Mill: accounts[2] ", accounts[2]);
    console.log("Shop: accounts[3] ", accounts[3]);
    console.log("Costumer: accounts[4] ", accounts[4]);

    // 1st Test
    it("Testing smart contract function harvest that allows a farmer to harvest the seed", async() => {
        const callerID = ownerID;
        const supplyChain = await SupplyChain.new( {from: callerID});
         // Add Address to farmerRoll
        await supplyChain.addFarmer(farmerID, {from: callerID});


        // Declare and Initialize a variable for event
       let eventEmitted = false;

        // Watch the emitted event Harvested()
        let event = await supplyChain.Harvested({}, (err, res) => {
            eventEmitted = true;
        });

        let harvestTime = Date.now();
        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvest(productionID, farmerID, farmerName, harvestTime, fieldName,
          latitude, longitude, {from: farmerID});

        // Retrieve farm data from oil production
        const result = await supplyChain.fetchOilProductionFarm.call(productionID, {from: callerID});

        // Verify the result set
        assert.equal(result[0], farmerID, 'Error: Missing or Invalid ownerID, Farmer is Owner of the oilproduction');
        assert.equal(result[1], farmerID, 'Error: Missing or Invalid farmerID');
        assert.equal(result[2], farmerName, 'Error: Missing or Invalid farmerName');
        assert.equal(result[3], harvestTime, 'Error: Missing or Invalid harvestTime');
        assert.equal(result[4], fieldName, 'Error: Missing or Invalid fieldName');
        assert.equal(result[5], latitude, 'Error: Missing or Invalid latitude');
        assert.equal(result[6], longitude, 'Error: Missing or Invalid longitude');
        assert.equal(result[7], 0, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');
    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Processed()


        // Mark an item as Processed by calling function processtItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Packed()


        // Mark an item as Packed by calling function packItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event ForSale()


        // Mark an item as ForSale by calling function sellItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Sold()
        var event = supplyChain.Sold()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Shipped()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Received()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Declare and Initialize a variable for event


        // Watch the emitted event Purchased()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set:

    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set:

    })

});

