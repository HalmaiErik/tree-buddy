let contract = artifacts.require("");

module.exports = function(deployer) {
    deployer.deploy(YourContract ,constructorparam1, param2, param3);
};
