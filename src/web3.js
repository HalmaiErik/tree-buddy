import Web3 from "web3";
let web3;
if (window.ethereum && window.ethereum.isMetaMask) {
    web3 = new Web3(window.ethereum);
}
else {
    web3 = new Web3('https://ropsten.infura.io/v3/872068728e024a3485c78b9fc66020ca');
}

export default web3;

const actorContractAddress = "0xF6146BAdfd5577A1149731D13bF0600379BC7fB6";
const cuttingContractAddress = "0x05230Dd9dF98967dBff7B87B0c07944b45077992";
const transportationContractAddress = "0x3BA67dcc5898e2A8ec2ff0C00eD85F00a0D8e6f8";

const abiActorContract = require('./abi/ActorsRegistration.json').abi;
const abiCuttingContract = require('./abi/TreeCutting.json').abi;
const abiTransportContract = require('./abi/Transportation.json').abi;

export const actorContract = new web3.eth.Contract(abiActorContract, actorContractAddress);
export const cuttingContract = new web3.eth.Contract(abiCuttingContract, cuttingContractAddress);
export const transportContract = new web3.eth.Contract(abiTransportContract, transportationContractAddress);
