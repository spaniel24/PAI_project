import './RegisterModal.css'
import {useCallback, useState} from "react";
import axios from "axios";

const RegisterModal = ({onClose}) => {

    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleUserNameChange = (event) => {
        setUserNameValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const handleSubmit = () => {
        axios.post('http://localhost:3001/register', {
            username: userNameValue,
            password: passwordValue
        })
        onClose()
    }

    return (
        <>
            <div className="transparent-background"/>
            <div className="login-modal">
                <div>
                    Register
                </div>
                <div>
                    <span>Username:</span>
                    <input type="text" value={userNameValue} onChange={handleUserNameChange}/>
                </div>
                <div>
                    <span>Password:</span>
                    <input type="password" value={passwordValue} onChange={handlePasswordChange}/>
                </div>
                <div className="login-modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </>
    )
};

export default RegisterModal;