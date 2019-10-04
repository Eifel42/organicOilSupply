pragma solidity ^0.5.8;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CustomerRole' to manage this role - add, remove, check
contract CustomerRole {
    using Roles for Roles.Role;

    event CustomerAdded(address indexed account);
    event CustomerRemoved(address indexed account);

    Roles.Role private Customers;

    constructor() public {
      _addCustomer(msg.sender);
    }

    modifier onlyCustomer(address CustomerID) {
      require(
        isCustomer(CustomerID), 'Only a Customer can do this');
      _;
    }

    function isCustomer(address account) public view returns (bool) {
      return Customers.has(account);
    }

    function addCustomer(address account) public {
      _addCustomer(account);
    }

    function renounceCustomer() public {
      _removeCustomer(msg.sender);
    }

    function _addCustomer(address account) internal {
      Customers.add(account);
      emit CustomerAdded(account);
    }

    function _removeCustomer(address account) internal {
      Customers.remove(account);
      emit CustomerRemoved(account);
    }
}
