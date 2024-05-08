import React from 'react';
import './RadioGroup.css';
const RadioGroup = ({ type, first, second, last }) => {
    return (
        <div>
            <label htmlFor={`f-option-${type}`} className="l-radio" tabIndex={1}>
                <input type="radio" id={`f-option-${type}`} name={type} />
                <span>{first}</span>
            </label>
            <label htmlFor={`s-option-${type}`} className="l-radio">
                <input type="radio" id={`s-option-${type}`} name={type} tabIndex={2} />
                <span>{second}</span>
            </label>
            {last && <label htmlFor={`t-option-${type}`} className="l-radio">
                <input type="radio" id={`t-option-${type}`} name={type} tabIndex={3} />
                <span>{last}</span>
            </label>}
        </div>
    );
}

export default RadioGroup;
