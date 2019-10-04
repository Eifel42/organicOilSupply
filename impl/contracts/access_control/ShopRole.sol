pragma solidity ^0.5.8;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract ShopRole {

  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ShopAdded(address indexed account);
  event ShopRemoved(address indexed account);

  // Define a struct 'shop' by inheriting from 'Roles' library, struct Role
  Roles.Role private shops;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addShop(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyShop(address shopID) {
    require(isShop(shopID));
    _;
  }

  // Define a function 'isShop' to check this role
  function isShop(address account) public view returns (bool) {
    return shops.has(account);
  }

  // Define a function 'addShop' that adds this role
  function addShop(address account) public {
    _addShop(account);
  }

  // Define a function 'renounceShop' to renounce this role
  function renounceShop() public {
    _removeShop(msg.sender);
  }

  // Define an internal function '_addShop' to add this role, called by 'addFarmer'
  function _addShop(address account) internal {
    shops.add(account);
    emit ShopAdded(account);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeShop(address account) internal {
    shops.remove(account);
    emit ShopRemoved(account);
  }
}
