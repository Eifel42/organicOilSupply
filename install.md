# Installation

A step by step series of examples that tell you have to get a development env running

## Clone this repository:

```
git clone https://github.com/Eifel42/organicOilSupply.git
```

## Install nodejs packages
Change directory to ```impl``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd impl
npm install
```

##Launch Ganache:

```
ganache-cli -b2 -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

```
Ganache CLI v6.7.0 (ganache-core: 2.8.0)

Available Accounts
==================
(0) 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95 (100 ETH)
(1) 0x018C2daBef4904ECbd7118350A0c54DbeaE3549A (100 ETH)
(2) 0xCe5144391B4aB80668965F2Cc4f2CC102380Ef0A (100 ETH)
(3) 0x460c31107DD048e34971E57DA2F99f659Add4f02 (100 ETH)
(4) 0xD37b7B8C62BE2fdDe8dAa9816483AeBDBd356088 (100 ETH)
(5) 0x27f184bdc0E7A931b507ddD689D76Dba10514BCb (100 ETH)
(6) 0xFe0df793060c49Edca5AC9C104dD8e3375349978 (100 ETH)
(7) 0xBd58a85C96cc6727859d853086fE8560BC137632 (100 ETH)
(8) 0xe07b5Ee5f738B2F87f88B99Aac9c64ff1e0c7917 (100 ETH)
(9) 0xBd3Ff2E3adEd055244d66544c9c059Fa0851Da44 (100 ETH)

Private Keys
==================
(0) 0x9137dc4de37d28802ff9e5ee3fe982f1ca2e5faa52f54a00a6023f546b23e779
(1) 0x18911376efeff48444d1323178bc9f5319686b754845e53eb1b777e08949ee9b
(2) 0xf948c5bb8b54d25b2060b5b19967f50f07dc388d6a5dada56e5904561e19f08b
(3) 0xfad19151620a352ab90e5f9c9f4282e89e1fe32e070f2c618e7bc9f6d0d236fb
(4) 0x19d1242b0a3f09e1787d7868a4ec7613ac4e85746e95e447797ce36962c7f68b
(5) 0x3bb675f8c07099816e23a3e283090cfb0f793ab625b73ca51a2d027a3c1f2d0e
(6) 0x0faf45306c7daf14d86c266690ce54490e8c0104154cafa87d9e93724efc239d
(7) 0xf2a921dee0ebd7bfaba1a271bcd48c99baa6341a1cdf84ba843521a5555e0273
(8) 0x62734594840dade92a24448c8f676cc3c59fd68909837303417295f2c0f27963
(9) 0xc29afb730456eb83415046550faf8065c8531765396156db8d97fd1fd64c6a6e

HD Wallet
==================
Mnemonic:      spirit supply whale amount human item harsh scare congress discover talent hamster
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8545
```

## Compile contracts
In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

```
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/access_control/CustomerRole.sol
> Compiling ./contracts/access_control/FarmerRole.sol
> Compiling ./contracts/access_control/MillRole.sol
> Compiling ./contracts/access_control/Roles.sol
> Compiling ./contracts/access_control/ShopRole.sol
> Compiling ./contracts/base/SupplyChain.sol
> Compiling ./contracts/core/Ownable.sol
> Artifacts written to /Users/stefanzils/Documents/GitHub/organicOilSupply/impl/client/src/contracts
> Compiled successfully using:
   - solc: 0.5.8+commit.23d335f2.Emscripten.clang
```

This will create the smart contract artifacts in folder ```impl/client/src/contracts/```.

## Migrate contracts
Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

```
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'development'
> Network id:      1570222629174
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xeb2b8405b08ea7a87294f72dc11dd9541bd41c4b2f6ccd90c8091bb1d50eeb78
   > Blocks: 0            Seconds: 0
   > contract address:    0xFEeCfF2CB7d6f3BfcBE5fa41c49c8fB642f2dDbF
   > block number:        5
   > block timestamp:     1570222639
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.99738607
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
   > transaction hash:    0x81977e73aa15ae6b1b1d1ed53186c8292b3b929561c6c7322d20381f6b875c04
   > Blocks: 0            Seconds: 0
   > contract address:    0xf2ee0b0Cdcae5013930B92c0Ba54F7F7f1933613
   > block number:        7
   > block timestamp:     1570222643
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.99324778
   > gas used:            371806
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371806 ETH


   Deploying 'MillRole'
   --------------------
   > transaction hash:    0xb061c809187d9b5660d7fb1633d5df651b614d9f5da48b33a0c7d9dc8fa8763d
   > Blocks: 0            Seconds: 0
   > contract address:    0xd22De155853B67cE1cA3693FBE52EE958f755E7b
   > block number:        8
   > block timestamp:     1570222645
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.9895318
   > gas used:            371598
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371598 ETH


   Deploying 'ShopRole'
   --------------------
   > transaction hash:    0x1c8e30903e61095d215cbc22d8083a5c380f5e597529a9c106f4a2ee5d3bbd30
   > Blocks: 0            Seconds: 0
   > contract address:    0x79051A2faFcC216A55d3897474012145d158F170
   > block number:        9
   > block timestamp:     1570222647
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.98581246
   > gas used:            371934
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371934 ETH


   Deploying 'CustomerRole'
   ------------------------
   > transaction hash:    0xecbb76dc51de45dc0b0e40de62667ab5c698433684178aabcf479fc37993b44b
   > Blocks: 0            Seconds: 0
   > contract address:    0xA65B87754E0A73860AA6B7eb6E95D79CD2d893d2
   > block number:        10
   > block timestamp:     1570222649
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.98209312
   > gas used:            371934
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00371934 ETH


   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0x76706a05d21e4a6513237a5ddd5365924061105b2073d795efd0580fb6c18e2a
   > Blocks: 0            Seconds: 0
   > contract address:    0x23E2b13b08a22E9eEe431F862eC7A17aB1E99B98
   > block number:        11
   > block timestamp:     1570222651
   > account:             0x27D8D15CbC94527cAdf5eC14B69519aE23288B95
   > balance:             99.94291614
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

## Test smart contracts:

```
truffle test
```

All tests pass. The tests also check the firing of the events and if an unknown user tries to start a transaction.

```
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
