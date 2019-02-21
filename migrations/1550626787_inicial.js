var Prueba = artifacts.require('./Prueba.sol');

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Prueba);
};
