import React from 'react';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import leonardoImage from '../assets/images/Leonardo-Dicaprio.png';
import faahadImage from '../assets/images/Faahad-Fazil.png';
import CaptainJackSparrowImage from '../assets/images/profile.png';
import HeathLedgerImage from '../assets/images/heath-ledger.png';
import VijaySethupathiImage from '../assets/images/vijay-sethupathi.png';
import './WhoIsOnLeave.css';

let data = [
    {
        label: 'Today',
        profiles: [
            {
                name: 'Captain Jack Sparrow',
                title: 'Team Lead',
                image: CaptainJackSparrowImage,
            }
        ]
    },
    {
        label: 'This Week',
        profiles: [
            {
                name: 'Heath Ledger',
                title: 'Senior Security Solutions Engineer',
                image: HeathLedgerImage,
            },
            {
                name: 'Vijay Sethupathi',
                title: 'Team Lead',
                image: VijaySethupathiImage,
            }
        ]
    },
    {
        label: 'Next Week',
        profiles: [
            {
                name: 'Leonardo Dicaprio',
                title: 'Senior Security Solutions Engineer',
                image: leonardoImage,
            },
            {
                name: 'Faahadh Fazil',
                title: 'Security Solutions Engineer',
                image: faahadImage,
            },
            {
                name: 'Captain Jack Sparrow',
                title: 'Team Lead',
                image: CaptainJackSparrowImage,
            }
        ]
    }
]

const WhoIsOnLeave = () => {
    return (
        <div className='on-leave-list'>
            <div className="header">
                <EventBusyIcon />
                <span>Who's on Leave</span>
            </div>
            <div className="list">
                {data.map(list => (
                    <div className="group" key={list.label}>
                        <span className="label">{list.label}</span>
                        <div className="profiles">
                            {list.profiles.map((item, index) => (
                                <div className="profile" key={list.label + item.name + index}>
                                    <img src={item.image} alt="profile" className='image' />
                                    <div className="userInfo">
                                        <span className="name">{item.name}</span>
                                        <span className='title'>{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WhoIsOnLeave;