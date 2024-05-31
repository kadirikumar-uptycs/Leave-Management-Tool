import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/joy/Modal';
import Grow from '@mui/material/Grow';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
const LeaveReason = ({ reason }) => {
    let [open, setOpen] = useState(false);
    return (
        <>
            <IconButton size='sm' color='primary' sx={{color: '#222bcc'}} onClick={() => setOpen(true)}>
                <AssignmentIcon />
            </IconButton>

            {/* Modal to show Reason in a TextArea */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
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
                        <div>
                            <Typography
                                color="primary"
                                level="h1"
                                variant="soft"
                                textAlign="center"
                                borderRadius="30px"
                                marginBottom="15px"
                                fontFamily="cursive"
                            >
                                Reason
                            </Typography>
                        </div>
                        <Textarea
                            color="primary"
                            readOnly
                            minRows={500}
                            sx={{
                                width: '100%',
                                height: '80%',
                                cursor: 'pointer !important',
                                '--Textarea-focusedHighlight': '#12467B !important',
                                '&::before': {
                                    transition: 'box-shadow .15s ease-in-out',
                                },
                                color: '#0c0048',
                                fontFamily: 'Poppins-Medium',
                                fontSize: '15px',
                            }}
                            maxRows={500}
                            placeholder=""
                            size="lg"
                            variant="outlined"
                            defaultValue={reason}
                        />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            marginTop: '30px'
                        }}>
                            <Button sx={{backgroundColor: '#12467B', fontFamily:'Orbitron-Regular', letterSpacing: '3px'}} startDecorator={<CloseIcon />} onClick={() => setOpen(false)}>CLOSE</Button>
                        </div>
                    </Box>
                </Grow>
            </Modal>
        </>
    );
}

export default LeaveReason;
