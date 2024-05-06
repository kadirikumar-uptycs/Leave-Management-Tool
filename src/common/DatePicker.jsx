import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as CustomDatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{
                fontFamily: 'Poppins-ExtraBold'
            }}>
                <CustomDatePicker
                    slotProps={{ textField: { size: 'small', fullWidth: false } }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default DatePicker;
