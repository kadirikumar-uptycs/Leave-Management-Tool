import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import UserMenu from './UserMenu';

const UserCard = ({ ProfileImage, name, role, phone, email, shift }) => {
    return (
        <Card
            sx={{
                maxWidth: 300,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#f4f9ff',
                borderRadius: '11px',
            }}
        >
            {
                (shift === 'US') ? (
                    <Tooltip title="US Shift">
                        <LocalAirportIcon sx={{
                            position: 'absolute',
                            top: '12px',
                            left: '15px'
                        }} />
                    </Tooltip>
                ) : <></>
            }
            <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                padding: 0
            }}>
                <UserMenu />
            </div>
            <Avatar
                alt={name}
                src={ProfileImage}
                sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    marginTop: 1
                }}
            />
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    level="h6"
                    component="div"
                    sx={{
                        marginTop: 2,
                        fontFamily: 'Poppins-ExtraBold',
                        color: '#0c0048',

                    }}
                >
                    {name}
                </Typography>

                <Typography level="body2" color="neutral" component="div" sx={{
                    margin: '10px 0 3px 0',
                    backgroundColor: '#e9ebfb',
                    borderRadius: '100px',
                    width: 'max-content',
                    padding: '3px 11px',
                    fontSize: '11px',
                    fontFamily: 'sans-serif',
                    color: '#594f77'
                }}
                >
                    {role}
                </Typography>

                <Typography
                    level="body2"
                    color="neutral"
                    component="div"
                    sx={{
                        marginTop: 1,
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '900',
                        color: '#928fab'
                    }}
                >
                    {phone}
                </Typography>
                <Link
                    href="mailto:fafa@uptycs.com"
                    color="primary"
                    sx={{
                        fontSize: '17px',
                        textDecoration: 'none'
                    }}
                >
                    {email}
                </Link>
            </CardContent>
        </Card>
    );
};

export default UserCard;
