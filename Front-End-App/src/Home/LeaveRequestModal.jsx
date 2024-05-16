import React, { useState } from 'react';
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
import GitHubTooltip from '../common/GitHubToolTip';
import './LeaveRequestModal.css';


const LeaveRequestModal = ({ open, onClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) !important',
        width: 890,
        height: 690,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
    };

    let [manager, setManager] = useState(1);

    const handleChange = (event) => {
        setManager(event.target.value);
    };
    return (
        <Modal
            open={open}
            onClose={(event, reason) => {
                if (reason && reason === "backdropClick")
                    return;
                onClose();
            }}
            disableEscapeKeyDown
        >
            <Grow in={open}>
                <Box sx={style}>
                    <h2 className='Heading'>Apply Leave</h2>
                    <div className="body">
                        <div className="col col-1">
                            <div className="group">
                                <span className="title">Reporting Manager</span>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <Select
                                        value={manager}
                                        onChange={handleChange}
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
                                        <MenuItem value={1}>Sri Rajasekaran</MenuItem>
                                        <MenuItem value={2}>Kiran Wali</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="group">
                                <span className="title">Leaves Left</span>
                                <span className='input'>You have used <strong>8.5 Leaves</strong> upto this point</span>
                            </div>
                        </div>
                        <div className="col col-2 group">
                            <span className="title">Leave Type</span>
                            <div className="input">
                                <RadioGroup type="leave-type" first="Sick Leave" second="Paid Leave" />
                            </div>
                        </div>
                        <div className="col col-3">
                            <div className="group">
                                <span className="title">From</span>
                                <div className="input">
                                    <DatePicker />
                                </div>
                            </div>
                            <div className="group">
                                <span className="title">Day Type</span>
                                <div className="input">
                                    <RadioGroup type="from-date" first="Full" second="First Half" last="Second Half" />
                                </div>
                            </div>
                        </div>
                        <div className="col col-4">
                            <div className="group">
                                <span className="title">To</span>
                                <div className="input">
                                    <DatePicker />
                                </div>
                            </div>
                            <div className="group">
                                <span className="title">Day Type</span>
                                <div className="input">
                                    <RadioGroup type="to-date" first="Full" second="First Half" last="Second Half" />
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
                            <GitHubTooltip>
                                <Button variant="solid" sx={{
                                    width: '150px',
                                    aspectRatio: '3/0.9',
                                    backgroundColor: '#222bcc',
                                    color: '#fbfcfe',
                                    '&:hover': {
                                        backgroundColor: '#595fd2;'
                                    }
                                }}
                                >
                                    Apply
                                </Button>
                            </GitHubTooltip>

                        </div>
                    </div>
                </Box>
            </Grow>
        </Modal>
    );
};

export default LeaveRequestModal;