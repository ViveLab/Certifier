const Certifier = artifacts.require('Certifier');

const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

contract('Certifier', accounts => {
  describe('Contract instance', () => {
    const [owner] = accounts;
    it('should get a non-null instance of the contract', () => {
      return Certifier.deployed().then(instance => {
        certifier = instance;
        expect(certifier).not.to.be.null;
      });
    });
    it('should be registered with the owner account', () => {
      return certifier.owner().then(registeredOwner => {
        expect(registeredOwner).to.eq(owner);
      });
    });
  });
  describe('Course information', () => {
    const [owner, unauthorized] = accounts;
    const courseId = 123;
    const courseName = 'Contratos inteligentes con Solidity';
    const startingDate = moment().format('x');
    const endingDate = moment().add(5, 'weeks').format('x');
    const courseCost = 3;
    const intensity = 45;
    const threshold = 80;
    const minimumStudent = 10;
    it('should add a new course', () => {
      return certifier.addCourse(
        courseId,
        courseName,
        startingDate,
        endingDate,
        courseCost,
        intensity,
        threshold,
        minimumStudent
      ).then(response => {
        expect(response.tx).to.match(/0x[a-fA-F0-9]{64}/);
      })
    });
    it('should retrieve a course by its ID', () => {
      return certifier.getCourseByID(courseId).then(course => {
        const [name, sd, ed, cc, i, t, ms] = Object.values(course);
        expect(name).to.eq(courseName);
        expect(sd.toNumber()).to.eq(parseInt( startingDate ));
        expect(ed.toNumber()).to.eq(parseInt( endingDate ));
        expect(cc.toNumber()).to.eq(parseInt( courseCost ));
        expect(i.toNumber()).to.eq(parseInt( intensity ));
        expect(t.toNumber()).to.eq(parseInt( threshold ));
        expect(ms.toNumber()).to.eq(parseInt( minimumStudent ));
      });
    });
    it('should not add a new course if unauthorized', () => {
      return expect(
        certifier.addCourse(
          courseId,
          courseName,
          startingDate,
          endingDate,
          courseCost,
          intensity,
          threshold,
          minimumStudent,
          {from: unauthorized}
        )
      ).to.be.eventually.rejected;
    });
  });
  describe('Students', () => {
    const [owner, student] = accounts;
    const courseId = 123;
    const courseCost = 3;
    const name = 'Juana Pena';
    const id = 'CC123';
    const email = 'jp@a.com';
    it('should be able to subscribe correctly', () => {
      return certifier.subscribeToCourse(
        courseId,
        web3.utils.toHex( id ),
        name,
        email,
        {
          from: student,
          value: web3.utils.toWei(web3.utils.toBN( courseCost ))
        }
      )
        .then(response => {
          expect(response.tx).to.match(/0x[a-fA-F0-9]{64}/);
        });
    });
    it('should retrieve a student by course code and student id', () => {
      return certifier.getStudentByCourseAndId(courseId, web3.utils.toHex( id ))
        .then(student => {
          expect(student['0']).to.eq(name);
          expect(student['1']).to.eq(email);
        });
    });
    it('should fail when paying less for subscription', () => {
      return expect(
        certifier.subscribeToCourse(
          courseId,
          web3.utils.toHex( id ),
          name,
          email,
          {
            from: student,
            value: web3.utils.toWei(web3.utils.toBN( courseCost - 1 ))
          }
        )
      ).to.be.eventually.rejected;
    });
    it('should fail when paying more for subscription', () => {
      return expect(
        certifier.subscribeToCourse(
          courseId,
          web3.utils.toHex( id ),
          name,
          email,
          {
            from: student,
            value: web3.utils.toWei(web3.utils.toBN( courseCost + 1 ))
          }
        )
      ).to.be.eventually.rejected;
    });
  });
});
