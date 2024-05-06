import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

export default function PerformanceHelpIcon() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div className="help" aria-describedby={id} variant="contained" onClick={handleClick}>
                <ErrorRoundedIcon />
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Performance mesures as follows:</Typography>
                <Typography sx={{ p: 2 }}>✨ 100% - 80% : Good ✅👏</Typography>
                <Typography sx={{ p: 2 }}>✨ 80% - 60% : Average ⚠️🥱</Typography>
                <Typography sx={{ p: 2 }}>✨ {"< 60%"} : Bad ❌😤</Typography>
            </Popover>
        </div>
    );
}