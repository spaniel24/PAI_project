import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import './Section.css';

const Section = ({sectionName, sectionCallback}) => {
    return (

        <button className="no-style-button" onClick={() => sectionCallback(sectionName)}>
            <div className="category-button">
                <span>{sectionName}</span>
                <FontAwesomeIcon icon={faAngleRight}/>
            </div>
        </button>
    )
}

export default Section;