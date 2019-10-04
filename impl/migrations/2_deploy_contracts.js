// migrating the appropriate contracts
let FarmerRole = artifacts.require("./FarmerRole.sol");
let MillRole = artifacts.require("./MillRole.sol");
let ShopRole = artifacts.require("./ShopRole.sol");
let CustomerRole = artifacts.require("./CustomerRole.sol");
let SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(MillRole);
  deployer.deploy(ShopRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(SupplyChain);
};
