pragma solidity ^0.5.8;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CostumerRole' to manage this role - add, remove, check
contract CostumerRole {
    using Roles for Roles.Role;

    event CostumerAdded(address indexed account);
    event CostumerRemoved(address indexed account);

    Roles.Role private costumers;

    constructor() public {
      _addCostumer(msg.sender);
    }

    modifier onlyCostumer() {
      require(
        isCostumer(msg.sender), 'Only a Costumer can do this');
      _;
    }

    function isCostumer(address account) public view returns (bool) {
      return costumers.has(account);
    }

    function addCostumer(address account) public onlyCostumer {
      _addCostumer(account);
    }

    function renounceCostumer() public {
      _removeCostumer(msg.sender);
    }

    function _addCostumer(address account) internal {
      costumers.add(account);
      emit CostumerAdded(account);
    }

    function _removeCostumer(address account) internal {
      costumers.remove(account);
      emit CostumerRemoved(account);
    }
}
