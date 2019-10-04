pragma solidity ^0.5.8;
// Define a contract 'Supplychain'
import '../access_control/CustomerRole.sol';
import '../access_control/FarmerRole.sol';
import '../access_control/ShopRole.sol';
import '../access_control/MillRole.sol';
import '../core/Ownable.sol';


/** @title  Organic Oil Manufacturer
  * @author Stefan Zils
  * @notice Organic Oil Manufacturer SupplyChain implementation for farmer to customer.
  */
contract SupplyChain is Ownable, FarmerRole, MillRole, ShopRole, CustomerRole {

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint  upc;
  // Define a variable called 'sku' for Stock Keeping Unit (SKU)
  uint  sku;
  // Oil Production Sequence
  uint oilProductionID;
  // Define
  uint constant factorProductID = 1000;

  // Define a public mapping 'bottles' that maps the UPC to a bottle.
  mapping(uint => Bottle) bottles;
  // Define a public papping 'oilProductions' that maps the productionID to an OilProduction.
  mapping(uint => OilProduction) oilProductions;


   // Define enum 'State' with the following values:
  enum State
  {
      Harvested,     // 0
      Pressed,       // 1
      Bottled,       // 2
      Delivered,     // 3
      InShop,        // 4
      Sold           // 5
  }


  // Struct of the oil production process.
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

      string fieldName;      // Field Name
      string fieldLatitude;
      string fieldLongitude;

      State productionState;  // state of production
      string notice;

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
      address customerID; // Metamask-Ethereum address of the Consumer,

      uint    bottleDate;
      uint    inShopDate;
      uint    sellDate;

      uint    oilProductionID;  // OilProduction ID (Foreign Key, Reference)
      uint    price;            // Bottle Price

      State   bottleState;      // Product State as represented in the enum above
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event Harvested(uint productionID);
  event Pressed(uint productionID);
  event Bottled(uint productionID);
  event Delivered(uint productionID);
  event InShop(uint upc);
  event Sold(uint upc);

  // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
      require(isOwner(), "Not the owner!");
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
      upc = 1;
      oilProductionID = 1;
  }

  // Define a function 'kill' if required
  function kill() public {
    if (isOwner()) {
      selfdestruct(msg.sender);
    }
  }

   /**
     * @dev describe the harvest as the first step of the OilProduction.
     * @param _productionID ID of the OilProduction process.
     * @param _farmerID address of the farmer
     * @param _farmerName the name of the farm.
     * @param _harvestDate date of harvesting.
     * @param _fieldName the name of the field.
     * @param _latitude the latitude of the field.
     * @param _longitude the longitude of the field.
     * @notice emit the Harvested Event. Only farmers can trigger this method.
     */
  function harvest(uint _productionID, address _farmerID, string memory  _farmerName, uint _harvestDate,
      string memory _fieldName, string memory _latitude, string memory _longitude)
      public
      onlyFarmer(_farmerID)
  {
      OilProduction memory production;
      production.productionID = _productionID;
      production.ownerID = _farmerID;
      production.farmerID = _farmerID;

      production.farmerName = _farmerName;
      production.harvestDate = _harvestDate;
      production.productionState = State.Harvested;
      production.fieldName = _fieldName;
      production.fieldLatitude = _latitude;
      production.fieldLongitude = _longitude;

      oilProductions[production.productionID] = production;
      oilProductionID += 1;

      // Emit the appropriate event
      emit Harvested(_productionID);
  }


   /**
     * @dev describe the oil pressing process of the OilProduction.
     * @param _productionID ID of the OilProduction process.
     * @param _millID address of mill.
     * @param _millName name of the mill.
     * @param _amountLiters the number of liters of pressed oil.
     * @param _pressDate date of the pressing.
     * @notice emit the Pressed Event. Only a miller can trigger the method if the state is harvest (Harvested).
     */
  function press(uint _productionID, address _millID, string memory _millName, uint _amountLiters, uint _pressDate)
      public
      onlyMill(_millID)
      harvested(_productionID)
  {
      OilProduction storage production = oilProductions[_productionID];

      production.ownerID = _millID;
      production.millID = _millID;

      production.millName = _millName;
      production.pressDate = _pressDate;
      production.productionState = State.Pressed;
      production.amountLiters = _amountLiters;

      emit Pressed(production.productionID);
  }

  /**
    * @dev describe the bottling process of the OilProduction.
    * @param _productionID ID of the OilProduction process.
    * @param _bottlingDate date of bottling.
    * @param _millID address of mill.
    * @notice emit the Bottled Event. Only a miller can trigger the method
    * if the state is press (Pressed).
    */
  function bottling(uint _productionID, uint _bottlingDate, address _millID)
      public
      onlyMill(_millID)
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
        bottle.sku = sku;

        // generate productionID from upc and sku.
        bottle.productID = bottle.upc + bottle.sku;
        bottle.oilProductionID = production.productionID;
        bottle.ownerID = production.millID;
        bottle.millID = production.millID;
        bottle.bottleDate = _bottlingDate;
        bottle.bottleState = State.Bottled;

        bottles[upc] = bottle;
        // List for delivery and later control
        production.bottleIDs[i] = upc;
        production.bottleCount += 1;
        upc += 1;
      }
      emit Bottled(production.productionID);
  }

  /**
    * @dev describe the bottling process of the OilProduction.
    * @param _productionID ID of the OilProduction process.
    * @param _deliveryDate date of delivery.
    * @param _millID address of mill.
    * @notice emit the Delivered Event. Only a miller can trigger the method
    * if the state is bottle (Bottled).
    */
  function deliver(uint _productionID, address _shopID, uint _deliveryDate, address _millID)
      public
      onlyMill(_millID)
      bottled(_productionID)
   {
      OilProduction storage production = oilProductions[_productionID];
      production.ownerID = _shopID;
      production.shopID = _shopID;
      production.deliveryDate = _deliveryDate;
      production.productionState = State.Delivered;

      for (uint i=0; i < production.bottleCount; i++) {
          Bottle storage bottle = bottles[production.bottleIDs[i]];
          bottle.ownerID = _shopID;
          bottle.shopID = _shopID;
          bottle.bottleState = State.Delivered;
      }

      emit Delivered(production.productionID);
  }

  /**
    * @dev describe the process of putting the bottles into the shop.
    * @param _productionID ID of the OilProduction process.
    * @param _inShopDate date of get delivery.
    * @param _price price of the bottle.
    * @param _shopID address of shop.
    * @notice emit the InShop Event. Only a shop can trigger the method
    * if the state is deliver (Delivered).
    */
  function getDelivery(uint _productionID, uint _inShopDate, uint _price, address _shopID)
      public
      onlyShop(_shopID)
      delivered(_productionID)
  {
    OilProduction storage production = oilProductions[_productionID];
    production.inShopDate = _inShopDate;
    production.productionState = State.InShop;

    for (uint i=0; i < production.bottleCount; i++) {
      Bottle storage bottle = bottles[production.bottleIDs[i]];
      bottle.price = _price;
      bottle.inShopDate = _inShopDate;
      bottle.bottleState = State.InShop;
    }

    emit InShop(production.productionID);
  }

  /**
    * @dev describe the process of buying a bottle.
    * @param _upc Universal Product Code, identifier to fetch a bottle in the supply chain.
    * @param _customerID address of the customer.
    * @param _sellDate price of the bottle.
    * @notice emit the Sold Event. Only a customer can trigger the method
    * if the state is in shop (InShop) and the customer pay enough.
   */
  function buyBottle(uint _upc, address _customerID, uint _sellDate)
    public
    payable
    onlyCustomer(_customerID)
    inShop(_upc)
    paidEnough(bottles[_upc].price)
    checkValue(_upc)
  {
    Bottle storage bottle = bottles[_upc];

    bottle.bottleState = State.Sold;
    bottle.sellDate = _sellDate;
    bottle.ownerID = _customerID;
    bottle.customerID = _customerID;

    address payable shopID = address(uint160(bottle.shopID));
    shopID.transfer(bottle.price);

    emit Sold(bottle.upc);
  }

  /**
    * @dev fetch the oil production data from the farm perspective.
    * @param _productionID ID of the OilProduction process.
    */
  function fetchOilProductionFarm(uint _productionID) public view returns
  (
      address,
      address,
      string memory,
      uint,
      string memory,
      string memory,
      string memory,
      State
  )
  {
      OilProduction storage oilProduction = oilProductions[_productionID];
      return
      (
          oilProduction.ownerID,        // 0
          oilProduction.farmerID,       // 1
          oilProduction.farmerName,     // 2
          oilProduction.harvestDate,    // 3
          oilProduction.fieldName,      // 4
          oilProduction.fieldLatitude,  // 5
          oilProduction.fieldLongitude, // 6
          oilProduction.productionState // 7
      );
  }

    /**
    * @dev fetch the oil production data from the mill and shop perspective.
    * @param _productionID ID of the OilProduction process.
    */
  function fetchOilProduction(uint _productionID) public view returns
  (
      address,
      address,
      address,
      string memory,
      uint,
      uint,
      uint,
      uint,
      uint,
      uint,
      State
  )
  {
      OilProduction storage oilProduction = oilProductions[_productionID];
      return
      (
          oilProduction.ownerID,        // 0
          oilProduction.millID,         // 1
          oilProduction.shopID,         // 2
          oilProduction.millName,       // 3
          oilProduction.pressDate,      // 4
          oilProduction.amountLiters,   // 5
          oilProduction.bottlingDate,   // 6
          oilProduction.deliveryDate,   // 7
          oilProduction.inShopDate,     // 8
          oilProduction.bottleCount,    // 9
          oilProduction.productionState // 10
      );
  }


  /**
    * @dev fetch a bottle.
    * @param _upc Universal Product Code, identifier to fetch a bottle in the supply chain.
    */
  function fetchBottle(uint _upc) public view returns
  (
      uint,
      uint,
      address,
      address,
      address,
      address,
      uint,
      uint,
      uint,
      uint,
      uint,
      State
  )
  {
    Bottle memory bottle = bottles[_upc];
    return
    (
      bottle.sku,             // 0
      bottle.productID,       // 1
      bottle.ownerID,         // 2
      bottle.millID,          // 3
      bottle.shopID,          // 4
      bottle.customerID,      // 5
      bottle.bottleDate,      // 6
      bottle.inShopDate,      // 7
      bottle.sellDate,        // 8
      bottle.oilProductionID, // 9
      bottle.price,           // 10
      bottle.bottleState      // 11
    );
  }
}
