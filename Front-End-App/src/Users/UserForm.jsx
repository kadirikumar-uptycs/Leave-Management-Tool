import React, { useRef } from 'react';
import { useSnackbar } from '../common/SnackBarProvider';
import './UserForm.css';
import RadioGroup from '../common/RadioGroup';

const UserForm = ({handleUserFormSubmit}) => {
    let formDataRef = useRef({})
    let openSnackbar = useSnackbar()
    let uptycsEmailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@uptycs\\.com$");
    let americaPhoneRegex = new RegExp("^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$")
    let indiaPhoneRegex = new RegExp("^[6-9](\\d{4})(\\s)?\\d{5}$")

    function checkRegexMatch(regex, testString) {
        return regex.test(testString);
    }

    function handleSelectEvent(event, index, option) {
        formDataRef.current = {
            ...formDataRef.current,
            shift: option
        }
    }

    let handleInputEvent = (event) => {
        formDataRef.current = {
            ...formDataRef.current,
            [event.currentTarget.name]: event.currentTarget.value
        }
    }

    let validateFormData = () => {
        let formData = formDataRef?.current || {};
        if (!formData.name) {
            openSnackbar('Name must be provided', 'danger')
        }
        else if (!formData.role) {
            openSnackbar('Role must be provided', 'danger')
        }
        else if (!formData.email) {
            openSnackbar('Email must be provided', 'danger')
        }
        else if (!formData.phone) {
            openSnackbar('Phone Number must be provided', 'danger')
        }
        else if (!formData.shift) {
            openSnackbar('Shift must be choosen', 'danger')
        }
        else if (!checkRegexMatch(uptycsEmailRegex, formData.email)) {
            openSnackbar('Invalid Uptycs Workspace Email', 'danger')
        }
        else if (formData.shift === 'IND' && !checkRegexMatch(indiaPhoneRegex, formData.phone)) {
            openSnackbar('Invalid Indian Phone Number', 'danger')
        }
        else if (formData.shift === 'US' && !checkRegexMatch(americaPhoneRegex, formData.phone)) {
            openSnackbar('Invalid American Phone Number', 'danger')
        }
        else {
            handleUserFormSubmit(formData);
        }
    }

    return (
        <div className="form-wrapper">
            <div className="user-form--container">
                <div className="text">
                    New User Form
                </div>
                <div className='form'>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" name='name' required onInput={handleInputEvent} />
                            <div className="underline"></div>
                            <label>Name</label>
                        </div>
                        <div className="input-data">
                            <input type="text" name='role' required onInput={handleInputEvent} />
                            <div className="underline"></div>
                            <label>Role</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" name='email' required onInput={handleInputEvent} />
                            <div className="underline"></div>
                            <label>Email</label>
                        </div>
                        <div className="input-data">
                            <input type="text" name='phone' required onInput={handleInputEvent} />
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
                                first="IND"
                                second="US"
                                handleChangeEvent={handleSelectEvent}
                            />
                        </div>
                    </div>
                    <div className="form-row submit-btn">
                        <div className="input-data">
                            <div className="inner"></div>
                            <input type="submit" value="submit" onClick={validateFormData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
