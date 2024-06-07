import React, { useRef, useState } from 'react';
import { useSnackbar } from '../hooks/SnackBarProvider';
import { useSelector } from 'react-redux';
import { differenceInDays, formatDateToStandard, getEndDate } from '../common/getCurrentDate';
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import Grow from '@mui/material/Grow';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '../common/RadioGroup';
import DatePicker from '../common/DatePicker';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import './LeaveRequestModal.css';


const LeaveRequestModal = ({ open, onClose, onLeaveFormSubmit }) => {

    const openSnackbar = useSnackbar();
    const userDetails = useSelector(state => state.auth.userInfo);
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    const userId = useSelector(state => state.auth?.userInfo?._id);
    const myLeaves = leaves.filter(leave => leave.userId === userId);
    const leavesTakenTillNow = myLeaves.filter(leave => leave.status === 'Approved').reduce((total, event) => total += event.noOfDays, 0)
    const formDataRef = useRef({
        reportedTo: "Sri Rajasekaran"
    });

    let [manager, setManager] = useState("Sri Rajasekaran")

    const handleChangeReporting = (event) => {
        setManager(event?.target?.value);
        if (typeof formDataRef?.current === 'string')
            formDataRef.current.reportedTo = event?.target?.value;
    };

    const handleChangeRadio = (event, index, option) => {
        let name = event.target.name;
        formDataRef.current[name] = option;
    }


    const handleDateChange = (name, value) => {
        formDataRef.current[name] = value;
    }

    const handleReasonInput = (event) => {
        formDataRef.current.reason = event.target.value;
    }

    const validateFormData = () => {
        let formData = formDataRef?.current || {};
        const yearAfterToday = formatDateToStandard(getEndDate(new Date(), 365));
        const today = formatDateToStandard(new Date());
        if (!formData.reportedTo) {
            openSnackbar('Choose your <REPORTING MANAGER>', 'danger');
        } else if (!formData.type) {
            openSnackbar('Select <LEAVE TYPE>', 'danger');
        } else if (!formData.from) {
            openSnackbar('Select <FROM> Date', 'danger');
        } else if (!formData.fromType) {
            openSnackbar("Select <DAY TYPE> for FROM Date", 'danger');
        } else if (!formData.to) {
            openSnackbar('Select <TO> Date', 'danger');
        } else if (!formData.toType) {
            openSnackbar("Select <DAY TYPE> for TO Date", 'danger');
        } else if (!formData.reason) {
            openSnackbar('Provide <REASON> for Leave', 'danger');
        } else if (formData.from < today) {
            openSnackbar('<FROM> cannot be in the past', 'danger');
        } else if (formData.from > yearAfterToday) {
            openSnackbar('<FROM> should be with in 1 Year from now', 'danger');
        } else if (formData.to > yearAfterToday) {
            openSnackbar('<TO> should be with in 1 Year from now', 'danger');
        }
        else if (formData.from > formData.to) {
            openSnackbar("'From' date cannot be later than the 'To' date", 'danger');
        } else if (formData.from === formData.to && formData.fromType !== formData.toType) {
            openSnackbar("For single day leave, the <DAY TYPE> for 'From' and 'To' should be the same.", 'danger');
        } else if (formData.from !== formData.to && formData.fromType === 'First Half') {
            openSnackbar('DISCONTINUED DATE: From Day Type should not be <FIRST HALF>', 'danger');
        } else if (formData.from !== formData.to && formData.toType === 'Second Half') {
            openSnackbar('DISCONTINUED DATE: To Day Type should not be <SECOND HALF>', 'danger');
        } else {
            let count = 0;
            let totalDays = differenceInDays(formData.from, formData.to) + 1;
            count += (formData.fromType === 'Full') ? 1 : 0.5;
            count += Math.max(totalDays - 2, 0);
            if (totalDays > 1) count += (formData.toType === 'Full') ? 1 : 0.5;

            formData.noOfDays = count;
            formData.name = userDetails.name;
            formData.role = userDetails.role;
            formData.email = userDetails.email;
            formData.profileImage = userDetails.profileImage || "";
            formData.shift = userDetails.shift;
            formDataRef.current = {
                reportedTo: "Sri Rajasekaran"
            }
            onLeaveFormSubmit(formData);
        }
    }


    return (
        <Modal
            open={open}
            onClose={(event, reason) => {
                if (reason && reason === "backdropClick")
                    return;
                formDataRef.current = { reportedTo: "Sri Rajasekaran" };
                onClose();
            }}
            disableEscapeKeyDown
        >
            <Grow in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) !important',
                    width: 890,
                    height: 690,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <span className='Heading'>Apply Leave</span>
                    <div className="body">
                        <div className="col col-1">
                            <div className="group">
                                <span className="title">Reporting Manager</span>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <Select
                                        value={manager}
                                        onChange={handleChangeReporting}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            color: '#000',
                                            fontFamily: 'Poppins-ExtraBold',
                                            fontWeight: '300',
                                            height: '50'
                                        }}
                                        className='input'
                                    >
                                        <MenuItem value="Sri Rajasekaran">Sri Rajasekaran</MenuItem>
                                        <MenuItem value="Kiran Wali">Kiran Wali</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group">
                                <span className="title">Leaves Left</span>
                                <span className='input'>You have used <strong>{leavesTakenTillNow} Leaves</strong> upto this point</span>
                            </div>
                        </div>
                        <div className="col col-2 group">
                            <span className="title">Leave Type</span>
                            <div className="input">
                                <RadioGroup type="type" first="Sick" second="Casual" handleChangeEvent={handleChangeRadio} />
                            </div>
                        </div>
                        <div className="col col-3">
                            <div className="group">
                                <span className="title">From</span>
                                <div className="input">
                                    <DatePicker onDateChange={(value) => {
                                        handleDateChange('from', value);
                                    }} />
                                </div>
                            </div>
                            <div className="group">
                                <span className="title">Day Type</span>
                                <div className="input">
                                    <RadioGroup type="fromType" first="Full" second="First Half" last="Second Half" handleChangeEvent={handleChangeRadio} />
                                </div>
                            </div>
                        </div>
                        <div className="col col-4">
                            <div className="group">
                                <span className="title">To</span>
                                <div className="input">
                                    <DatePicker onDateChange={(value) => {
                                        handleDateChange('to', value);
                                    }} />
                                </div>
                            </div>
                            <div className="group">
                                <span className="title">Day Type</span>
                                <div className="input">
                                    <RadioGroup type="toType" first="Full" second="First Half" last="Second Half" handleChangeEvent={handleChangeRadio} />
                                </div>
                            </div>
                        </div>
                        <div className="col col-5">
                            <div className="group">
                                <span className='title'>Reason for Leave</span>
                                <Textarea
                                    color="primary"
                                    disabled={false}
                                    minRows={4}
                                    sx={{
                                        width: '600px',
                                        '--Textarea-focusedHighlight': '#222bcc !important',
                                        '&::before': {
                                            transition: 'box-shadow .15s ease-in-out',
                                        },
                                        color: '#0c0048',
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: '15px',
                                    }}
                                    maxRows={4}
                                    placeholder=""
                                    size="lg"
                                    variant="outlined"
                                    onKeyUp={handleReasonInput}
                                />
                            </div>
                        </div>
                        <div className="col col-6">
                            <Button variant="soft" sx={{
                                width: '150px',
                                aspectRatio: '3/0.9',
                                backgroundColor: '#dedefe',
                                color: '#222bcc',
                                '&:hover': {
                                    backgroundColor: '#b8b8e5',
                                }
                            }}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                sx={{
                                    width: '150px',
                                    aspectRatio: '3/0.9',
                                    backgroundColor: '#222bcc',
                                    color: '#fbfcfe',
                                    '&:hover': {
                                        backgroundColor: '#595fd2;'
                                    }
                                }}
                                onClick={validateFormData}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </Box>
            </Grow>
        </Modal>
    );
};

export default LeaveRequestModal;