pragma solidity ^0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Certifier.sol";

contract TestCertifier {
  function testContractInstance() public {
    Certifier certifier = Certifier(DeployedAddresses.Certifier());
    Assert.equal(certifier.owner(), msg.sender, "You are not the expected owner");
  }
}
