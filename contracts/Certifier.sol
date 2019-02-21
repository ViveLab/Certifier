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
    mapping(bytes32 => Student) students;
    bytes32[] studentsIds;
  }

  struct Student {
    string name;
    string email;
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
      minimumStudent: _minimumStudent,
      studentsIds: new bytes32[](0)
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

  function subscribeToCourse(
    uint _courseId,
    bytes32 _id,
    string memory _name,
    string memory _email
  ) public payable {
    Course storage course = courses[_courseId];
    require(course.courseCost * 1 ether == msg.value, "You should pay the exact value");
    course.students[_id] = Student({
      name: _name,
      email: _email
    });
    course.studentsIds.push(_id);
  }

  function getStudentByCourseAndId(
    uint _courseId,
    bytes32 _id
  ) public view onlyOwner returns(string memory _name, string memory _email) {
    Course storage course = courses[_courseId];
    Student storage student = course.students[_id];
    _name = student.name;
    _email = student.email;
  }
}
