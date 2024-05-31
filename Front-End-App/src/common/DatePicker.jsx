import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as CustomDatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatDateToStandard } from '../common/getCurrentDate';
const DatePicker = ({ onDateChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{
                fontFamily: 'Poppins-ExtraBold'
            }}>
                <CustomDatePicker
                    disablePast
                    slotProps={{ textField: { size: 'small', fullWidth: false } }}
                    onChange={(value) => {
                        onDateChange(formatDateToStandard(value));
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default DatePicker;
