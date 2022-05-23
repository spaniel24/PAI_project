import './App.css';
import Navbar from "./Navbar/Navbar";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu";
import ItemCards from "./ItemCards/ItemCards";
import {useCallback, useEffect, useState} from "react";
import axios from 'axios'
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";

function App() {

    const myMovies = {
        name: "My rented movies"
    }

    const moviesToRent = {
        name: "Movies to rent"
    }

    const [selectedCategory, setSelectedCategory] = useState('Movies to rent')
    const [movies, setMovies] = useState([]);


    const fetchMovies = useCallback(
        () => {
            axios.get('http://localhost:3001/movies', {withCredentials: true}).then(res => {
                setMovies(res.data)
                setAuthError(false)
            })
        }, []);

    const [authError, setAuthError] = useState(false);

    const fetchMyMovies = useCallback(
        () => {
            axios.get('http://localhost:3001/myMovies', {withCredentials: true}).then(res => {
                setMovies(res.data)
            }).catch(reason => {
                setAuthError(true)
            })
        }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies])

    const [showingLoginModal, setShowingLoginModal] = useState(false);

    const renderLoginModal = () => {
        if (showingLoginModal) {
            return (
                <LoginModal onClose={() => setShowingLoginModal(false)}/>
            )
        }

        return null;
    }

    const [showingRegisterModal, setShowingRegisterModal] = useState(false);

    const renderRegisterModal = () => {
        if (showingRegisterModal) {
            return (
                <RegisterModal onClose={() => setShowingRegisterModal(false)}/>
            )
        }

        return null;
    }

    const handleSectionSelection = (sectionName) => {
        if (sectionName !== selectedCategory) {
            if (sectionName === 'Movies to rent') {
                fetchMovies();
            }
            if (sectionName === "My rented movies") {
                fetchMyMovies();
            }
        }
        setSelectedCategory(sectionName)
    }

    const handleItemClick = () => {
        fetchMovies()
    }

    return (
        <>
            {renderLoginModal()}
            {renderRegisterModal()}
            <div className="website">
                <div className="website-top">
                    <Navbar showLoginModal={() => setShowingLoginModal(true)}
                            showRegisterModal={() => setShowingRegisterModal(true)}/>
                </div>
                <div className="website-middle">
                    <LeftSideMenu categories={[moviesToRent, myMovies]} categoryCallback={handleSectionSelection}/>
                    {authError ? <div>Sorry, available only to logged users</div> :
                        <ItemCards items={movies} onItemClick={handleItemClick}/>}
                </div>
            </div>
        </>
    );
}

export default App;
