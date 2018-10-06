pragma solidity ^0.4.23;

contract Certifier {
  address public owner;
  uint public last_completed_migration;
  mapping(bytes32 => Course) courses;

  struct Course {
    string name;
    uint cost;
    uint duration;
    uint threshold;
    bytes32[] codes;
    mapping(address => Student) students;
  }

  struct Student {
    string fname;
    string lname;
    uint age;
    string email;
    bytes32[] codes;
  }

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require (msg.sender == owner);
    _;
  }

  function addCourse(
    bytes32 _code,
    string _name,
    uint _cost,
    uint _duration,
    uint _threshold,
    bytes32[] _codes) public restricted {
      courses[_code] = Course({
        name: _name,
        cost: _cost,
        duration: _duration,
        threshold: _threshold,
        codes: _codes
      });
  }

  function getCourse(bytes32 _code) public view restricted returns(string, uint, uint, uint, bytes32[]) {
    Course storage course = courses[_code];
    return(course.name, course.cost, course.duration, course.threshold, course.codes);
  }

  function subscribe(
    bytes32 _code,
    string _fname,
    string _lname,
    uint _age,
    string _email
  ) public payable {
    require(msg.value == 3 ether, "You haven't sent exactly 3 ether");
    Course storage course = courses[_code];
    course.students[msg.sender] = Student({
      fname: _fname,
      lname: _lname,
      age: _age,
      email: _email,
      codes: new bytes32[](0)
    });
  }
}
