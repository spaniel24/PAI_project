import './Navbar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({showLoginModal, showRegisterModal}) => {
    return (
        <div className="navbar">
            <div className="left-navbar">
            </div>
            <div className="title">
                Spaniel-VHS
            </div>
            <div className="buttons">
                <button className="cart" onClick={showLoginModal}>
                    <FontAwesomeIcon icon={faLock} />
                </button>
                <button className="register-button" onClick={showRegisterModal}>
                    Register
                </button>
            </div>
        </div>
    );
}
export default Navbar;