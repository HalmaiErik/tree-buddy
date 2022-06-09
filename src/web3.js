import Web3 from "web3";
let web3;
if (window.ethereum && window.ethereum.isMetaMask) {
    web3 = new Web3(window.ethereum);
}
else {
    web3 = new Web3('https://ropsten.infura.io/v3/872068728e024a3485c78b9fc66020ca');
}

export default web3;

const actorContractAddress = "0xA0aE44CAE30482eD33C3C36651c0eB3C5991Ce91";
const cuttingContractAddress = "0x9b8a11063aAe16EEC72687DfFfa29bD6BE8b45F2";
const transportationContractAddress = "0xa6434512e68B993E20ACfd9479F7f49539E25115";

const abiActorContract = require('./abi/ActorsRegistration.json').abi;
const abiCuttingContract = require('./abi/TreeCutting.json').abi;
const abiTransportContract = require('./abi/Transportation.json').abi;

export const actorContract = new web3.eth.Contract(abiActorContract, actorContractAddress);
export const cuttingContract = new web3.eth.Contract(abiCuttingContract, cuttingContractAddress);
export const transportContract = new web3.eth.Contract(abiTransportContract, transportationContractAddress);
