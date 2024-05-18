import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
export default function FestivalToolTip({ props, children }) {

    let { imageSrc, wikipedia_URL, title, Eventdate, description, tags } = props;

    return (
        <Tooltip
            placement="top"
            variant="outlined"
            sx={{
                padding: 0,
            }}
            title={
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 320,
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <img src={imageSrc} alt="" style={{
                        width: '100%',
                        height: '220px',
                    }} />
                    <Typography
                        fontSize="sm"
                        textColor="grey"
                        sx={{
                            paddingLeft: 2,
                            paddingTop: 1,
                            padding: '5px 15px 0 15px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            href={wikipedia_URL}
                            target="_blank"
                            rel="noopener"
                        >
                            <Typography sx={{ fontSize: '15px' }}>{title}</Typography>
                        </Link>
                        <span style={{ color: '#777', fontFamily: 'Hind-Regular', fontWeight: '700' }}>{Eventdate}</span>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', padding: '5px 15px 10px 15px' }}>
                        <div>
                            <Typography
                                textColor="text.secondary"
                                fontSize="sm"
                                sx={{
                                    mb: 1,
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 4,
                                    height: '6em',
                                    lineHeight: '1.5em',
                                    whiteSpace: "normal",
                                    textOverflow: 'ellipsis',
                                    fontSize: '12px',
                                    fontFamily: 'Poppins-Regular'
                                }}
                            >
                                {description}
                            </Typography>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                {tags.includes('IND') ? (
                                    <Chip size="sm" color="primary" sx={{ fontWeight: 'lg', padding: '2px 5px', display: 'flex', alignItems: 'center' }}>
                                        INDIA
                                        <img src="https://media.tenor.com/f7t624exZA0AAAAi/india-india-flag.gif" alt="" width={10} height={10} style={{ marginLeft: '5px' }} />
                                    </Chip>
                                ) : <></>}
                                {tags.includes('US') ? (
                                    <Chip size="sm" color="danger" sx={{ ml: 1, fontWeight: 'lg', padding: '2px 5px', display: 'flex', alignItems: 'center' }}>
                                        America
                                        <img src="https://media1.tenor.com/m/_31gH9b_0VsAAAAC/usa-flag-american.gif" alt="" width={12} height={12} style={{ marginLeft: '5px' }} />
                                    </Chip>
                                ) : <></>}
                            </div>
                        </div>
                    </Box>
                </Box>
            }
        >

            {children}
        </Tooltip>
    );
}
