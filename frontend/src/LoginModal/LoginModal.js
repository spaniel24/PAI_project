import './Login.css'
import {useState} from "react";
import axios from "axios";

const LoginModal = ({onClose}) => {

    const [userNameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showError, setShowError] = useState(false);

    const handleUserNameChange = (event) => {
        setUserNameValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const handleSubmit = () => {
        axios.post('http://localhost:3001/login', {
            username: userNameValue,
            password: passwordValue
        }, {withCredentials:true}).then(response => {
            onClose()
        }).catch(reason => {
            if (reason.response.status === 401) {
                setShowError(true)
            }
        })
    }

    return (
        <>
            <div className="transparent-background"/>
            <div className="login-modal">
                <div>
                    Login
                </div>
                {showError && <div>
                    Sorry, incorrect username or password
                </div>}
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
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </>
    )
};

export default LoginModal;