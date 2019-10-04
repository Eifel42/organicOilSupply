# Deploy smart contract on a public test network

## Compile and test

All tests pass. The tests also check the firing of the events and if an unknown user tries to start a transaction.

```
truffle compile
truffle test

Using network 'development'.

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

ganache-cli accounts used here...
Contract Owner: accounts[0]  0x824e7D37AA006690445B68E8E2C9d10a4FdD8599
Farmer: accounts[1]  0x84248fBd79d3A87a45dD3C148c305CD9d1a2dBc8
Mill: accounts[2]  0x738752c0C7E9Ca314cC5A4B28a0D6fCe4715016D
Shop: accounts[3]  0x7193550af3327f422f1308baD33dA204D1A95D65
Customer: accounts[4]  0xc92AF5A75c4d852ba49a22222D89A2E52879b5ED
Unkown: accounts[9]  0x814fCCA51F3294b781DDA98b5c3c359E5881eE3A


  Contract: SupplyChain
    ✓ Testing smart contract function harvest that allows a farmer to harvest the seed (451ms)
    ✓ Testing the smart contract function press that allows a miller to press oil (290ms)
    ✓ Testing the smart contract function bottling that enables a miller to bottle the oil (910ms)
    ✓ Testing smart contract function deliver that allows a miller to send the bottles to the shop (465ms)
    ✓ Testing smart contract function getDelivery that allows the shops to put the bottles into the shop (447ms)
    ✓ Testing smart contract function sellBottle that enables the shop to sell a bottle to the customer (272ms)
    ✓ Testing smart contract function fetchOilProductionFarm (48ms)
    ✓ Testing smart contract function fetchOilProduction (46ms)
    ✓ Testing smart contract function fetchBottle (38ms)


  9 passing (3s)
```

## Deploy 


## Deploy on Rinkeby

The following section describes the output from deployment to the Rinkeby test network.

```
truffle migrate --network rinkeby

Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x6ad9a6


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x612d59ebeb0af6ed9b65b63d88a9f30a7bbb757224d3d6998392c67e477b2535
   > Blocks: 0            Seconds: 12
   > contract address:    0x44732d65F58B9826d787D3486842D73c0a4C0079
   > block number:        5205096
   > block timestamp:     1570215435
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.45086925
   > gas used:            261393
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00261393 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00261393 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x6c037aec65d9a61cf4e03eea88903af50f10f942dee7127cc3b1b31d144e879a
   > Blocks: 1            Seconds: 12
   > contract address:    0x4A1C5F2d84b3118376924Af8F7D4bf0BDc617eB0
   > block number:        5205098
   > block timestamp:     1570215465
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.44673096
   > gas used:            371806
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371806 ETH


   Deploying 'MillRole'
   --------------------
   > transaction hash:    0xce45d7b2b99651b0403259d4a7456a2696e682c7b7c4e11b30b346d8e06fe780
   > Blocks: 0            Seconds: 8
   > contract address:    0x182d74d264C7cA6bc413596CF8D70dc212B9eE8B
   > block number:        5205099
   > block timestamp:     1570215480
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.44301498
   > gas used:            371598
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371598 ETH


   Deploying 'ShopRole'
   --------------------
   > transaction hash:    0x856a19227061ee588aaee846a07df755695b75aff437dbe84f0ce14ea7f2d009
   > Blocks: 0            Seconds: 8
   > contract address:    0x0474138F09DF54a0291a7D3a01B0F5e390bC88A6
   > block number:        5205100
   > block timestamp:     1570215495
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.43929564
   > gas used:            371934
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371934 ETH


   Deploying 'CustomerRole'
   ------------------------
   > transaction hash:    0xb89147ae7b26143f88f2bb7f8eb556dbe51f5b7d558e7452f50cca0511ff68ea
   > Blocks: 0            Seconds: 9
   > contract address:    0x93e186381F3231Cf2A2f1d1201f2c65369837D61
   > block number:        5205101
   > block timestamp:     1570215510
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.4355763
   > gas used:            371934
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371934 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0x5d52d69b10358dca61bf7af72bf25d05dae755b6384aa56d73e79068af66507a
   > Blocks: 0            Seconds: 8
   > contract address:    0xCBB44C5913e4bdfC8Fa392E704334796A1E8C23e
   > block number:        5205102
   > block timestamp:     1570215525
   > account:             0xd163786d38BE7Ce408D0F40e5d509572c4F1f6da
   > balance:             24.39639932
   > gas used:            3917698
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03917698 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0540497 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.05666363 ETH
```
## Rinkeby Etherscan 

- [Link to Transaction  0x5d52d69b10358dca61bf7af72bf25d05dae755b6384aa56d73e79068af66507a](https://rinkeby.etherscan.io/tx/0x5d52d69b10358dca61bf7af72bf25d05dae755b6384aa56d73e79068af66507a)
- [Link to SupplyChain Contract 0xCBB44C5913e4bdfC8Fa392E704334796A1E8C23e](https://rinkeby.etherscan.io/address/0xcbb44c5913e4bdfc8fa392e704334796a1e8c23e)

