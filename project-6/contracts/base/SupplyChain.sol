pragma solidity ^0.5.8;
// Define a contract 'Supplychain'
import '../access_control/CostumerRole.sol';
import '../access_control/FarmerRole.sol';
import '../access_control/ShopRole.sol';
import '../access_control/MillRole.sol';
import '../core/Ownable.sol';

contract SupplyChain is Ownable, FarmerRole, MillRole, ShopRole, CostumerRole {

  // Define 'owner'
  address contractOwner;

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint  upc;

  // Define a variable called 'sku' for Stock Keeping Unit (SKU)
  uint  sku;

  // Oil Production Sequence
  uint oilProductionID;
  // Fields for production
  uint fieldIDs;

  // Define a public mapping 'items' that maps the UPC to an Item.
  mapping(uint => Bottle) bottles;
  //
  mapping(uint => OilProduction) oilProductions;


  enum FieldState
  {
      Planted, // 0
      Harvested // 1
  }

  uint constant factorProductID = 1000;

  // Define enum 'State' with the following values:
  enum State
  {
      Harvested,     // 0
      Pressed,       // 1
      Bottled,       // 2
      Delivered,     // 3
      InShop,         // 4
      Sold           // 5
  }

  struct Field {
      uint fieldID;          // Field ID
      string fieldName;      // Field Name

      FieldState fieldState; // state of planting

      // Coordination of the Field
      string latitude;
      string longitude;
  }

  struct OilProduction {
      uint productionID;    // ID of Oil Production

      address ownerID;
      address farmerID;     // Metamask-Ethereum address of the Farmer
      address millID;       // Metamask-Ethereum address of the Mill, Redundancy with OilProduction
      address shopID;

      string farmerName;    // Name of the Farme
      string millName;      // Name of the Mill

      // Date of production step
      uint harvestDate;
      uint pressDate;
      uint bottlingDate;
      uint deliveryDate;
      uint inShopDate;
      uint amountLiters;

      State productionState;  // state of production
      string notice;

      mapping (uint => Field) fields;
      uint bottleCount;
      mapping (uint => uint)  bottleIDs;
  }

  // Define a struct 'Item' with the following fields:
  struct Bottle {
      uint    sku;        // Stock Keeping Unit (SKU)
      uint    upc;        // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
      uint    productID;  // Product ID potentially a combination of upc + sku

      address ownerID;    // Metamask-Ethereum address of the current owner as the product moves through 8 stages
      address millID;
      address shopID;     // Metamask-Ethereum address of the Shop,
      address costumerID; // Metamask-Ethereum address of the Consumer,

      uint    bottleDate;
      uint    inShopDate;
      uint    sellDate;

      uint    oilProductionID;  // OilProduction ID (Foreign Key, Reference)
      uint    price;            // Bottle Price

      State   bottleState;      // Product State as represented in the enum above
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event Harvested(uint upc);
  event Pressed(uint upc);
  event Bottled(uint upc);
  event Delivered(uint upc);
  event InShop(uint upc);
  event Sold(uint upc);

  // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
      require(msg.sender == contractOwner, "Not the owner!");
      _;
  }

  // Define a modifer that verifies the Caller
  modifier verifyCaller (address _address) {
    require(msg.sender == _address, "Not the Caller");
    _;
  }

  // Define a modifier that checks if the paid amount is sufficient to cover the price
  modifier paidEnough(uint _price) {
    require(msg.value >= _price, "Not Paid Enough");
    _;
  }

  // Define a modifier that checks the price and refunds the remaining balance
  modifier checkValue(uint _upc) {
    _;
    uint _price = bottles[_upc].price;
    uint amountToReturn = msg.value - _price;
    msg.sender.transfer(amountToReturn);
  }

  // Define a modifier that checks if an item.state of a upc is Harvested
  modifier harvested(uint _productionID) {
    require(oilProductions[_productionID].productionState == State.Harvested);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Processed
  modifier pressed(uint _productionID) {
    require(oilProductions[_productionID].productionState == State.Pressed, "Not Pressed");
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Packed
  modifier bottled(uint _productionID) {
    require(oilProductions[_productionID].productionState == State.Bottled, "Not Bottled");
    _;
  }

  // Define a modifier that checks if an item.state of a upc is ForSale
  modifier delivered(uint _productionID) {
    require(oilProductions[_productionID].productionState == State.Delivered, "Not Delivered");
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Sold
  modifier inShop(uint _upc) {
    require(bottles[_upc].bottleState == State.InShop, "Not in Shop");
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Shipped
  modifier sold(uint _upc) {
    require(bottles[_upc].bottleState  == State.Sold, "Not Sold");
    _;
  }

  // In the constructor set 'owner' to the address that instantiated the contract
  // and set 'sku' to 1
  // and set 'upc' to 1
  constructor() public payable {
      contractOwner = msg.sender;
      upc = 1;
      oilProductionID = 1;
  }

  // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == address(contractOwner)) {
      selfdestruct(msg.sender);
    }
  }

  // Define a function 'harvestItem' that allows a farmer to mark an item 'Harvested'
  function harvest(uint _productionId, string memory  _farmerName, uint _harvestDate,
      uint _fieldId, string memory _fieldName, string memory _latitude, string memory _longitude)
      public
      onlyFarmer()
  {

      OilProduction memory production;
      production.productionID = _productionId;

      production.ownerID = msg.sender;
      production.farmerID = msg.sender;

      production.farmerName = _farmerName;
      production.harvestDate = _harvestDate;
      production.productionState = State.Harvested;

      oilProductions[production.productionID] = production;
      oilProductionID += 1;

      // Only one field data to show how it works (Prototype).
      // In professional version separate method for add field, and get field data
      Field memory field;
      field.fieldID = _fieldId;
      field.fieldName = _fieldName;
      field.latitude = _latitude;
      field.longitude = _longitude;
      field.fieldState = FieldState.Harvested;
      oilProductions[production.productionID].fields[1] = field;

      // Emit the appropriate event
      emit Harvested(production.productionID);
  }

  function press(uint _productionId, string memory _millName, uint _amountLiters, uint _pressDate)
      public
      onlyMill()
      harvested(_productionId)
  {
      OilProduction storage production = oilProductions[_productionId];

      production.ownerID = msg.sender;
      production.millID = msg.sender;

      production.millName = _millName;
      production.pressDate = _pressDate;
      production.productionState = State.Pressed;
      production.amountLiters = _amountLiters;

      emit Pressed(production.productionID);
  }

  function bottling(uint _productionID, uint _bottlingDate)
      public
      onlyMill
      pressed(_productionID)
  {
      OilProduction storage production = oilProductions[_productionID];
      production.bottlingDate = _bottlingDate;
      production.productionState = State.Bottled;

      // generate sku with oilProductionID at the beginning.
      sku=(production.productionID * factorProductID);
      production.bottleCount=0;
      for (uint i=0; i < production.amountLiters; i++) {
        Bottle memory bottle;
        bottle.upc = upc;
        bottle.sku = sku + i;

        // generate productionID from upc and sku.
        bottle.productID = (upc * factorProductID) + sku;
        bottle.oilProductionID = production.productionID;
        bottle.ownerID = production.millID;
        bottle.millID = production.millID;
        bottle.bottleDate = _bottlingDate;

        bottles[upc] = bottle;
        // List for delivery and later control
        production.bottleIDs[i] = upc;
        production.bottleCount += 1;
        upc += 1;
      }
      emit Bottled(production.productionID);
  }

  function deliver(uint _productionID, uint _deliveryDate)
      public
      onlyMill
      bottled(_productionID)
   {
      OilProduction storage production = oilProductions[_productionID];
      production.ownerID = msg.sender;
      production.shopID = msg.sender;
      production.deliveryDate = _deliveryDate;
      production.productionState = State.Delivered;

      for (uint i=0; i < production.bottleCount; i++) {
          Bottle storage bottle = bottles[production.bottleIDs[i]];
          bottle.ownerID = msg.sender;
          bottle.shopID = msg.sender;
          bottle.bottleState = State.Delivered;
      }

      emit Delivered(production.productionID);
  }


  function getDelivery(uint _productionID, uint _inShopDate, uint _price)
      public
      onlyShop
      delivered(_productionID)
  {
    OilProduction storage production = oilProductions[_productionID];
    production.ownerID = msg.sender;
    production.shopID = msg.sender;
    production.inShopDate = _inShopDate;
    production.productionState = State.InShop;

    for (uint i=0; i < production.bottleCount; i++) {
      Bottle storage bottle = bottles[production.bottleIDs[i]];
      bottle.ownerID = msg.sender;
      bottle.shopID = msg.sender;
      bottle.price = _price;
      bottle.bottleState = State.InShop;
    }

    emit InShop(production.productionID);
  }

  function sellBottle(uint _upc)
    public
    payable
    onlyCostumer
    inShop(_upc)
    paidEnough(bottles[_upc].price)
    checkValue(_upc)
  {
    Bottle storage bottle = bottles[_upc];

    bottle.bottleState = State.Sold;
    bottle.ownerID = msg.sender;
    bottle.costumerID = msg.sender;

    address payable shopID = address(uint160(bottle.shopID));
    shopID.transfer(bottle.price);

    emit Sold(bottle.upc);
  }

  function fetchOilProduction(uint _productionID) public view returns
  (
      address,
      address,
      address,
      address,
      string memory,
      string memory,
      uint,
      uint

  )
  {
      OilProduction storage oilProduction = oilProductions[_productionID];
      return
      (
          oilProduction.ownerID,
          oilProduction.farmerID,
          oilProduction.millID,
          oilProduction.shopID,
          oilProduction.farmerName,
          oilProduction.millName,
          oilProduction.harvestDate,
          oilProduction.pressDate
      );
  }


  // Define a function 'fetchItemBufferTwo' that fetches the data
  function fetchBottle(uint _upc) public view returns
  (
      uint,
      uint,
      address,
      address,
      address,
      address,
      uint,
      uint
  )
  {
    Bottle memory bottle = bottles[_upc];
    return
    (
      bottle.sku,
      bottle.productID,
      bottle.ownerID,
      bottle.millID,
      bottle.shopID,
      bottle.costumerID,
      bottle.bottleDate,
      bottle.inShopDate

    );
  }
}
