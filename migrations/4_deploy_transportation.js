const registrationContract = artifacts.require("ActorsRegistration");
const cuttingContract = artifacts.require("TreeCutting");
const transportationContract = artifacts.require("Transportation");

module.exports = function(deployer) {
    deployer.deploy(transportationContract, registrationContract.address, cuttingContract.address);
};
