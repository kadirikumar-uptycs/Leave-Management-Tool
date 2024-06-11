const LeaveApplication = require('../models/leaveApplication');

let getLeaveApplications = async (req, res) => {
    try{
        let accessLevel = req?.user?.accessLevel;
        let userId = req?.user?._id;
        let filters = accessLevel === 'Admin'?{}:{userId};
        let applications = await LeaveApplication.find(filters);
        return res.status(200).send(applications);
    }catch(err){
        console.log("error while retrieving leave applications: ", err);
        return res.status(500).send(err)
    }
}

module.exports = getLeaveApplications;