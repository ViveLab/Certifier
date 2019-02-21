pragma solidity >=0.4.23 <0.6.0;


contract Prueba {
  address public owner;
  string public name;
  uint age;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Usted no esta autorizado");
    _;
  }

  function setPerson(string memory _name, uint _age) public onlyOwner {
    name = _name;
    age = _age;
  }

  function getAge() public view onlyOwner returns(uint) {
    return age;
  }
}
