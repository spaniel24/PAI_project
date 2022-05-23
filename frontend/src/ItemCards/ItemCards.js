import ItemCard from "./ItemCard/ItemCard";
import './ItemCards.css';


const ItemCards = ({items, onItemClick}) => {

    const renderItems = () => {
        if (items) {
            const itemCards = [];
            items.forEach(item => {
                itemCards.push(<ItemCard key={item.id} item={item} onClick={onItemClick}/>)
            })
            return itemCards;
        }
    }

    return (
        <div className="item-cards">
            {renderItems()}
        </div>
    );
}

export default ItemCards;