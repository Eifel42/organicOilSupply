pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'MillRole' to manage this role - add, remove, check
contract MillRole {

    // Define 2 events, one for Adding, and other for Removing
    event MillAdded(address indexed account);
    event MillRemoved(address indexed account);

    // Define a struct 'mills' by inheriting from 'Roles' library, struct Role
    Roles.Role private mills;

    // In the constructor make the address that deploys this contract the 1st mill
    constructor() public {
      _addmill(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyMill() {
      require(isMill(msg.sender));
      _;
    }

    // Define a function 'isMill' to check this role
    function isMill(address account) public view returns (bool) {
      return mills.has(account);
    }

    // Define a function 'addmill' that adds this role
    function addmill(address account) public onlyMill {
      _addMill(account);
    }

    // Define a function 'renouncemill' to renounce this role
    function renounceMill() public {
      _removeMill(msg.sender);
    }

    // Define an internal function '_addmill' to add this role, called by 'addmill'
    function _addMill(address account) internal {
      mills.add(account);
      emit millAdded(account);
    }

    // Define an internal function '_removemill' to remove this role, called by 'removemill'
    function _removeMill(address account) internal {
      mills.remove(account);
      emit millRemoved(account);
    }
}
