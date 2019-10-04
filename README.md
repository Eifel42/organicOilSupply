# Organic Oil Manufacturer

Organic oil manufacturer Ethereum Dapp example. It illustrates the supply chain from the farmer to the customer.

## Business Concept (Story / UML)

The organic farmer Bob produces exclusive rapeseed oils. Bob presses the oils in a nearby rapeseed mill. Afterward, he sells the oils at the farm shop. The oil is bottling in one-liter bottles, and each bottle has a unique identity code. Farming and the Harvest store (selling) are separate concerns. When Bob plans to produce oil, he harvests one or more fields and transports the seed to the mill. The mill pressed and bottled the oil. Bob will do all administrative stuff for the mill.

This example shows the possibilities of tracking of products like wine, beer, bread, or products in chemical or pharmaceutical industries. It tracks the products from the field to the customer. The example has one primary essence and two production steps.

* [Organic Oil story in UML](uml/uml.md)

# Implementation

## Installation

This section describes to clone the project and to do the first steps for development and testing.

* [Installstation](install.md)

## Deployment on Rinkeby

The following section shows the step to deploy the smart contracts on the Rinkeby test network. It shows the links to the transaction and the smart contract.

* [Deployment on Rinkeby](deployment.md)

## WEB UI 

The Web UI is development with react. To start and install the local webserver, please do the following steps.
```
cd impl/client
npm install
npm start
```

# Business Process

The following Business Process describes the process from harvesting to buying. A screenshot illustrates every step.

* [Business Process step by step](businessProcess.md)

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
* [React](https://reactjs.org/) - React framework for modular Javascript frontend development.

### Libraries

| Library             | Version       | Why used    |
|---------------------|---------------|-------------|
|Truffle              |v5.0.39        |Compile/deploy/test contracts, Ganache for running local test node, Drizzle for React Provider |
|Solidity             |v0.5.8         |smart contracts programming language|
|Node                 |v10.16.3       |Runtime for truffle and React |
|Web3                 |v1.2.1         |Connect to EVM |
|drizzle              |1.4.0          |Layer to connect via web3 to the smart contract|
|React                |16.8.6         |WebUI |


## Authors
* Stefan Zils

## Acknowledgments
* Udacity
* Solidity
* Ganache-cli
* Truffle
* React

