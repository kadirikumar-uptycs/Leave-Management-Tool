import React from 'react';
import './UserForm.css';
import RadioGroup from '../common/RadioGroup';

const UserForm = () => {
    function handleSelectEvent(event, index, option) { }

    return (
        <div className="form-wrapper">
            <div className="user-form--container">
                <div className="text">
                    New User Form
                </div>
                <div className='form'>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required />
                            <div className="underline"></div>
                            <label>Name</label>
                        </div>
                        <div className="input-data">
                            <input type="text" required />
                            <div className="underline"></div>
                            <label>Role</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required />
                            <div className="underline"></div>
                            <label>Email</label>
                        </div>
                        <div className="input-data">
                            <input type="text" required />
                            <div className="underline"></div>
                            <label>Phone</label>
                        </div>
                    </div>
                    <div className="form-row" style={{
                        marginLeft: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}>
                            <label>Shift</label>
                            <RadioGroup
                                type="new-user-shift"
                                first="India"
                                second="America"
                                handleChangeEvent={handleSelectEvent}
                            />
                        </div>
                    </div>
                    <div className="form-row submit-btn">
                        <div className="input-data">
                            <div className="inner"></div>
                            <input type="submit" value="submit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
