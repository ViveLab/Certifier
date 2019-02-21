pragma solidity >=0.4.23 <0.6.0;

contract Certifier {
  address public owner;
  mapping(uint => Course) courses;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Usted no esta autorizado");
    _;
  }

  struct Course {
    string courseName;
    uint startingDate;
    uint endingDate;
    uint courseCost;
    uint intensity;
    uint threshold;
    uint minimumStudent;
  }

  function addCourse(
    uint _courseId,
    string memory _courseName,
    uint _startingDate,
    uint _endingDate,
    uint _courseCost,
    uint _intensity,
    uint _threshold,
    uint _minimumStudent
  ) public onlyOwner {
    courses[_courseId] = Course({
      courseName: _courseName,
      startingDate: _startingDate,
      endingDate: _endingDate,
      courseCost: _courseCost,
      intensity: _intensity,
      threshold: _threshold,
      minimumStudent: _minimumStudent
    });
  }

  function getCourseByID(uint _courseId) public view returns(
    string memory,
    uint,
    uint,
    uint,
    uint,
    uint,
    uint
  ) {
    Course memory courseTmp = courses[_courseId];
    return (
      courseTmp.courseName,
      courseTmp.startingDate,
      courseTmp.endingDate,
      courseTmp.courseCost,
      courseTmp.intensity,
      courseTmp.threshold,
      courseTmp.minimumStudent
    );
  }
}
