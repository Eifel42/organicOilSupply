// migrating the appropriate contracts
let FarmerRole = artifacts.require("./FarmerRole.sol");
let MillRole = artifacts.require("./MillRole.sol");
let ShopRole = artifacts.require("./ShopRole.sol");
let CostumerRole = artifacts.require("./CostumerRole.sol");

module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(MillRole);
  deployer.deploy(ShopRole);
  deployer.deploy(CostumerRole);
};
