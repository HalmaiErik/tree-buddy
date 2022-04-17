const registrationContract = artifacts.require("ActorsRegistration");
const cuttingContract = artifacts.require("TreeCutting");

module.exports = function(deployer) {
    deployer.deploy(cuttingContract, registrationContract.address);
};
