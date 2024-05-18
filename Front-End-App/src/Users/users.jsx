import React, { useLayoutEffect, useState } from 'react';
import UserCard from './UserCard';
import FafaImage from '../assets/images/Faahad-Fazil.png';
import CaptainImage from '../assets/images/profile.png';
import LedgerImage from '../assets/images/heath-ledger.png';
import DiCaprioImage from '../assets/images/Leonardo-Dicaprio.png';
import SethupathiImage from '../assets/images/vijay-sethupathi.png';
import RajiniImage from '../assets/images/Rajinikanth.png';
import BramhiImage from '../assets/images/Bramhi.png';
import PrakashImage from '../assets/images/PrakashRaj.png';
import NTRImage from '../assets/images/NTR.png';
import KotaImage from '../assets/images/Kota.png';
import VenuMadhavImage from '../assets/images/venu-madhav.png';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import SearchBar from './SearchBar';
import Modal from '@mui/joy/Modal';
import Grow from '@mui/material/Grow';
import Box from '@mui/joy/Box';
import UserForm from './UserForm';

let users = [
    {
        name: 'Rajinikanth',
        role: 'Manager',
        shift: 'IND',
        phone: '+91 9932176543',
        email: 'rajinisuperstar@gmail.com',
        ProfileImage: RajiniImage,
    },
    {
        name: 'Captain Jack Sparrow',
        role: 'Team Lead',
        shift: 'US',
        phone: '(415) 555-0139',
        email: 'captainsparrow@gmail.com',
        ProfileImage: CaptainImage,
    },
    {
        name: 'Vijay Sethupathi',
        role: 'India Team Lead',
        shift: 'IND',
        phone: '+91 8722831232',
        email: 'sethupathivijay@gmail.com',
        ProfileImage: SethupathiImage,
    },
    {
        name: 'Leonardo DiCaprio',
        role: 'US Team Lead',
        shift: 'US',
        phone: '(303) 555-0198',
        email: 'dicaprioleonardo@gmail.com',
        ProfileImage: DiCaprioImage,
    },
    {
        name: 'Faahad Fazil',
        role: 'Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 987654321',
        email: 'fafa@gmail.com',
        ProfileImage: FafaImage,
    },
    {
        name: 'Heath Ledger',
        role: 'Security Solutions Engineer',
        shift: 'US',
        phone: '(606) 555-0186',
        email: 'jokerledger@gmail.com',
        ProfileImage: LedgerImage,
    },
    {
        name: 'Brahmanandam',
        role: 'Senior Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 8428652298',
        email: 'brahmijaffa@gmail.com',
        ProfileImage: BramhiImage,
    },
    {
        name: 'Prakash Raj',
        role: 'Senior Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 9736820182',
        email: 'rajparuguprakashraj@gmail.com',
        ProfileImage: PrakashImage,
    },
    {
        name: 'Nandamuri Taraka RamaRao',
        role: 'Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 7826208215',
        email: 'ntramaraojr@gmail.com',
        ProfileImage: NTRImage,
    },
    {
        name: 'Kota Srinivasa Rao',
        role: 'Senior Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 6394629107',
        email: 'srinivasaroakota@gmail.com',
        ProfileImage: KotaImage,
    },
    {
        name: 'Venu Madhav',
        role: 'Senior Security Solutions Engineer',
        shift: 'IND',
        phone: '+91 9183183672',
        email: 'venumadhav@gmail.com',
        ProfileImage: VenuMadhavImage,
    }
]

const Users = () => {
    let [filteredUsers, setFilteredUsers] = useState(users);
    let [showModal, setShowModal] = useState(false);

    let handleOpen = () => setShowModal(true);
    let handleClose = () => setShowModal(false);

    function filterUsers(query) {
        let queryArray = query.toLowerCase().split("");
        setFilteredUsers(users.filter(user => queryArray.every(char => user.name.toLowerCase().includes(char))))
    }

    useLayoutEffect(() => {
        document.title = "Users";
    }, [])
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px',
            }}>
                <SearchBar inputHandler={filterUsers} />
                <Button
                    startDecorator={
                        <Add />
                    }
                    sx={{
                        backgroundColor: '#0c0048',
                    }}
                    onClick={handleOpen}
                >New User
                </Button>

                {/* User Form Modal */}
                <Modal
                    open={showModal}
                    onClose={handleClose}
                >
                    <Grow in={showModal}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) !important',
                            width: 890,
                            height: 690,
                        }}>
                            <UserForm />
                        </Box>
                    </Grow>
                </Modal>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px 5px'
            }}>
                {
                    filteredUsers.map((user, index) => {
                        return (
                            <UserCard
                                key={index}
                                ProfileImage={user.ProfileImage}
                                name={user.name}
                                role={user.role}
                                phone={user.phone}
                                email={user.email}
                                shift={user.shift}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Users;
