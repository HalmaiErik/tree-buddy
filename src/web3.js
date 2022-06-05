import Web3 from "web3";
const web3 = new Web3(window.ethereum);
export default web3;

/*
Rinkeby:
- Actor: 0xbdB94F49303959C138FD2fC96051e6b422179E63
- Cutting: 0x638F9F041bba6c73F77b0cfDA9f852BE43990eca
- Transportation: 0x1E5bfe0636ea1eB7057fF5532A796FfBaFfB8c22
*/

const actorContractAddress = "0xbdB94F49303959C138FD2fC96051e6b422179E63";
const cuttingContractAddress = "0x638F9F041bba6c73F77b0cfDA9f852BE43990eca";
const transportationContractAddress = "0x1E5bfe0636ea1eB7057fF5532A796FfBaFfB8c22";

const abiActorContract = require('./abi/ActorsRegistration.json').abi;
const abiCuttingContract = require('./abi/TreeCutting.json').abi;
const abiTransportContract = require('./abi/Transportation.json').abi;

export const actorContract = new web3.eth.Contract(abiActorContract, actorContractAddress);
export const cuttingContract = new web3.eth.Contract(abiCuttingContract, cuttingContractAddress);
export const transportContract = new web3.eth.Contract(abiTransportContract, transportationContractAddress);