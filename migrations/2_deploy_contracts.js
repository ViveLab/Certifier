var Certifier = artifacts.require("./Certifier.sol");

module.exports = function(deployer) {
  deployer.deploy(Certifier);
};
