const getUsers = require('./getUsers');
const createUser = require('./createUser');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');
const getLeaveApplications = require('./getLeaveApplications');
const getHolidaysList = require('./getHolidaysList');

module.exports = {
    getUsers,
    createUser,
    editUser,
    deleteUser,
    getLeaveApplications,
    getHolidaysList,
}