import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
import AdjustIcon from '@mui/icons-material/Adjust';
import { getCurrentDate } from './getCurrentDate';
export default function GitHubTooltip({ children }) {

    return (
        <Tooltip
            placement="top"
            variant="outlined"
            arrow
            title={
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 320,
                        justifyContent: 'center',
                        p: 1,
                    }}
                >
                    <Typography
                        fontSize="sm"
                        textColor="grey"
                        startDecorator={
                            <Link
                                href="/"
                            >
                                <Typography>Leave Management Tool</Typography>
                            </Link>
                        }
                    >
                        on {getCurrentDate()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                        <AdjustIcon color="warning" />
                        <div>
                            <Typography fontWeight="lg" fontSize="sm">
                                [Pending] Server has to be implemented yet
                            </Typography>
                            <Typography textColor="text.secondary" fontSize="sm" sx={{ mb: 1 }}>
                                Up until now, this website has been static, but it will require server-side implementation to operate dynamically …
                            </Typography>
                            <Chip size="sm" color="danger" sx={{ fontWeight: 'lg' }}>
                                INPROGRESS 🧑‍💻
                            </Chip>
                            <Chip size="sm" color="primary" sx={{ ml: 1, fontWeight: 'lg' }}>
                                server: express js
                            </Chip>
                        </div>
                    </Box>
                </Box>
            }
        >

            {children}
        </Tooltip>
    );
}
