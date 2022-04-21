import Web3 from "web3";
const web3 = new Web3(window.ethereum);
export default web3;

const actorContractAddress = "0x7B31a38A00A65F9ff6897D8B280aC0f865a3DeE6";
const cuttingContractAddress = "0x0C5704C55FAc293a58b0FDe57d12CB9f27f2b878";
const transportationContractAddress = "0x907855D7463872cda23AC08FcC2b423a07D48781";

const abiActorContract = require('./abi/ActorsRegistration.json').abi;
const abiCuttingContract = require('./abi/TreeCutting.json').abi;
const abiTransportContract = require('./abi/Transportation.json').abi;

export const actorContract = new web3.eth.Contract(abiActorContract, actorContractAddress);
export const cuttingContract = new web3.eth.Contract(abiCuttingContract, cuttingContractAddress);
export const transportContract = new web3.eth.Contract(abiTransportContract, transportationContractAddress);