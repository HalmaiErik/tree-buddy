const registrationContract = artifacts.require("ActorsRegistration");

module.exports = function(deployer) {
    deployer.deploy(registrationContract);
};
