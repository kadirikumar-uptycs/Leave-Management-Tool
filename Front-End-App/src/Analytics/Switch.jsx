import React from 'react';
import Switch from '@mui/joy/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeSwitch({ dark, handleSwitchChange }) {
    return (
        <Switch
            color={dark ? 'primary' : 'danger'}
            slotProps={{ input: { 'aria-label': 'dark mode' } }}
            startDecorator={
                <LightModeIcon
                    sx={{ color: dark ? 'text.tertiary' : 'orange' }}
                />
            }
            endDecorator={
                <DarkModeIcon sx={{ color: dark ? 'blue' : 'text.tertiary' }} />
            }
            checked={dark}
            onChange={(event) => handleSwitchChange(event.target.checked)}
        />
    );
}