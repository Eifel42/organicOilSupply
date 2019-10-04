pragma solidity ^0.5.8;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'MillRole' to manage this role - add, remove, check
contract MillRole {

  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event MillAdded(address indexed account);
  event MillRemoved(address indexed account);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private mills;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addMill(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyMill(address millID) {
    require(isMill(millID));
    _;
  }

  // Define a function 'isMill' to check this role
  function isMill(address account) public view returns (bool) {
    return mills.has(account);
  }

  // Define a function 'addMill' that adds this role
  function addMill(address account) public {
    _addMill(account);
  }

  // Define a function 'renounceMill' to renounce this role
  function renounceMill() public {
    _removeMill(msg.sender);
  }

  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addMill(address account) internal {
    mills.add(account);
    emit MillAdded(account);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeMill(address account) internal {
    mills.remove(account);
    emit MillRemoved(account);
  }
}
