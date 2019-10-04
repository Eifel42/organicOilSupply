# Organic Oil Manufacturer

Organic oil manufacturer Ethereum Dapp example. It illustrates the supply chain from the farmer to the customer.

## Business Concept (Story / UML)

The organic farmer Bob produces exclusive rapeseed oils. Bob presses the oils in a nearby rapeseed mill. Afterward, he sells the oils at the farm shop. The oil is bottling in one-liter bottles, and each bottle has a unique identity code. Farming and the Harvest store (selling) are separate concerns. When Bob plans to produce oil, he harvests one or more fields and transports the seed to the mill. The mill pressed and bottled the oil. Bob will do all administrative stuff for the mill.

This example shows the possibilities of tracking of products like wine, beer, bread, or products in chemical or pharmaceutical industries. It tracks the products from the field to the customer. The example has one primary essence and two production steps.

[Organic Oil story in UML](uml/uml.md)

# Implementation

## Installing

[Deployement on Testnetwork](deployment.md)

## Test

## WEB UI 

TODO

[Documentation of the Web UI](impl/client/README.md)

# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

![truffle test](images/truffle_test.png)

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
** [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors
* Stefan Zils

## Acknowledgments
* Udacity
* Solidity
* Ganache-cli
* Truffle
