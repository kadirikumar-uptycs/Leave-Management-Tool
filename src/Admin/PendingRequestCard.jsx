import React from 'react';
import { formatDate, parseDate, getEndDate } from '../common/getCurrentDate';
import DropDownIcon from '../assets/images/down-arrow.png';
import Button from '@mui/joy/Button';
import GitHubTooltip from '../common/GitHubToolTip';
import './PendingRequestCard.css';
const PendingRequestCard = ({ leaveInfo }) => {
    return (
        <div className='PendingCard'>
            <div className="header">
                <div className="profile">
                    <img src={leaveInfo.imageSrc} alt="profile" className='image' />
                    <div className="userInfo">
                        <span className="name">{leaveInfo.name}</span>
                        <span className='title'>{leaveInfo.title}</span>
                    </div>
                </div>
                <div className="date">
                    {formatDate(leaveInfo.appliedDate)}
                </div>
            </div>
            <div className="from-to">
                <div className="from">
                    <span className="month">{parseDate(leaveInfo.startDate).month}</span>
                    <div className="day">
                        <span>{parseDate(leaveInfo.startDate).day}</span>
                        <img src={DropDownIcon} alt="" />
                    </div>
                    <div className="weekday">{parseDate(leaveInfo.startDate).weekDay}</div>
                </div>
                <div className="middle">
                    <div className="arrow">
                        <span>-----------➤</span>
                    </div>
                    <span className="count">{`${leaveInfo.days} day${leaveInfo.days > 1 ? 's' : ''}`}</span>
                </div>
                <div className="to">
                    <span className="month">{parseDate(getEndDate(leaveInfo.startDate, leaveInfo.days)).month}</span>
                    <div className="day">
                        <span>{parseDate(getEndDate(leaveInfo.startDate, leaveInfo.days)).day}</span>
                        <img src={DropDownIcon} alt="" />
                    </div>
                    <div className="weekday">{parseDate(getEndDate(leaveInfo.startDate, leaveInfo.days)).weekDay}</div>
                </div>
            </div>
            <div className="reason">
                <div className="leave-type">{leaveInfo.leaveType}</div>
                <div className="description">{leaveInfo.reason}</div>
            </div>
            <div className="available-leaves">
                <div>
                    <span className={`count ${leaveInfo.available > 5 ? 'success' : 'warning'}`}>{`${leaveInfo.available > 9 ? '' : '0'}${leaveInfo.available}`}&nbsp;&nbsp;</span>
                    <span className="label">Leaves Available</span>
                </div>
            </div>
            <div className="buttons">
                <GitHubTooltip>
                    <Button variant="solid" color='primary' sx={{
                        width: '120px',
                        aspectRatio: '3/0.9',
                    }}
                    >
                        Approve
                    </Button>
                </GitHubTooltip>

                <GitHubTooltip>
                    <Button variant="outlined" color='primary' sx={{
                        width: '120px',
                        aspectRatio: '3/0.9',
                    }}
                    >
                        Reject
                    </Button>
                </GitHubTooltip>
            </div>
        </div>
    );
}

export default PendingRequestCard;
