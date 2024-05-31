import React from 'react';

const ProgressRing = ({ available, total, color, Radius, showLabel, showPercentage }) => {
    const percentage = (available * 100 / total).toFixed(2);
    const Roundedpercentage = Math.floor(percentage);
    const radius = Radius ? Radius : 43;
    const circumference = 2 * Math.PI * radius;
    const progress = (Roundedpercentage / 100) * circumference;

    return (
        <>
            <style>{`
                @keyframes ${"rotate-" + Roundedpercentage} {
                    from {
                        stroke-dasharray: 0;
                        stroke-dashoffset: 0;
                    }
                    }
                    to {
                        stroke-dasharray: ${circumference};
                        stroke-dashoffset: ${circumference - progress};
                    }
                }
            `}</style>
            <svg width={radius * 2 + 14} height={radius * 2 + 14} viewBox={`0 0 ${radius * 2 + 14} ${radius * 2 + 14}`}>
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius}
                    fill="transparent"
                    stroke="#f9f9f9"
                    strokeWidth="9"
                    strokeLinecap='round'
                    style={{
                        transform: 'translate(5px, 5px)'
                    }}
                />
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="9"
                    strokeLinecap='round'
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    style={{
                        transform: 'translate(5px, 5px)',
                        animation: `${"rotate-" + Roundedpercentage} 1.5s ease-in-out`,
                    }}
                />
                {showLabel ? (<text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    dy="0.3em"
                    fill='#266d9b'
                    fontSize="11"
                    fontFamily='Poppins-Regular'
                    fontWeight="900"
                    style={{
                        userSelect: 'none',
                    }}
                >
                    Available
                </text>) : <></>}

                {showPercentage ? (<>
                    <text
                        x="33%"
                        y="50%"
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="27"
                        fill='#266d9b'
                        fontFamily='Poppins-semiBold'
                        fontWeight="500"
                        dx="1em"
                        style={{
                            userSelect: 'none',
                        }}
                    >
                        {percentage}
                    </text>
                    <text
                        x="69%"
                        y="50%"
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="11.7"
                        fill='#54617a'
                        fontFamily='Poppins-semiBold'
                        fontWeight="500"
                        dx="1em"
                        style={{
                            userSelect: 'none',
                        }}
                    >
                        %
                    </text>

                </>) : (<>
                    <text
                        x="40%"
                        y="65%"
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="15"
                        fontWeight="900"
                        fontFamily='Poppins-ExtraBold'
                        fill='#266d9b'
                        style={{
                            userSelect: 'none',
                        }}
                    >
                        {available < 10 ? `0${available}` : `${available}`}
                    </text>
                    <text
                        x="46%"
                        y="66%"
                        textAnchor="middle"
                        dy="0.3em"
                        fontSize="11.7"
                        fill='#d5d7db'
                        fontFamily='Poppins-semiBold'
                        fontWeight="500"
                        dx="1em"
                        style={{
                            userSelect: 'none',
                        }}
                    >
                        /{total}
                    </text>
                </>)
                }

            </svg>
        </>
    );
};

export default ProgressRing;