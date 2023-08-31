import Web3 from "web3";
let web3;
if (window.ethereum && window.ethereum.isMetaMask) {
    web3 = new Web3(window.ethereum);
}
else {
    web3 = new Web3('https://sepolia.infura.io/v3/872068728e024a3485c78b9fc66020ca');
}

export default web3;

const actorContractAddress = "0x031874347e19608D5923bF1C2DD70b37D910040a";
const cuttingContractAddress = "0x353a7bEB7E120B2535Eeb411d3dd411606f041ef";
const transportationContractAddress = "0xc32A4C32ed6fe1BCc1EafA5395e199C25c0D86BF";

const abiActorContract = require('./abi/ActorsRegistration.json').abi;
const abiCuttingContract = require('./abi/TreeCutting.json').abi;
const abiTransportContract = require('./abi/Transportation.json').abi;

export const actorContract = new web3.eth.Contract(abiActorContract, actorContractAddress);
export const cuttingContract = new web3.eth.Contract(abiCuttingContract, cuttingContractAddress);
export const transportContract = new web3.eth.Contract(abiTransportContract, transportationContractAddress);
