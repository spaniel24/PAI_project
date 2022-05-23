import './LeftSideMenu.css'
import Section from "./Section/Section";

const LeftSideMenu = ({categories, categoryCallback}) => {

    const renderButtonsArray = () => {
        if (categories) {
            const buttonsTable = [];
            categories.forEach(category=>{
                buttonsTable.push(<Section key={category.name} sectionName={category.name} sectionCallback={categoryCallback}/>)
            })
            return buttonsTable;
        }
    }

    return (
        <div className="left-side-menu">
            {renderButtonsArray()}
        </div>
    )
}

export default LeftSideMenu;