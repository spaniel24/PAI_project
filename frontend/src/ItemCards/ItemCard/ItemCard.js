import './ItemCard.css'
import axios from "axios";
import {DateTime} from 'luxon'
const ItemCard = ({item, onClick}) => {

    const handleRent = () => {
        axios.patch('http://localhost:3001/movies', {
            id: item.id
        }, {withCredentials: true}).then(response => {
            onClick(item.id)
        }).catch(reason => {
            alert('Sorry, you need to be logged in')
        })
    }

    return (
        <div className="item-card" key={item.id}>
            <img src={item.imageUrl}
                 alt={item.title}/>
            <div className="description">
                <div>
                    {item.title}
                </div>
                <div>
                    {item.description}
                </div>
                <div>
                    {item.rating}
                </div>
            </div>
            <div className="right-side">
                {item.returnDate ? <div className="return-date">Please return till {DateTime.fromISO(item.returnDate).toLocaleString()}</div> : <button
                    className="add-to-cart-button"
                    disabled={!item.available}
                    onClick={handleRent}
                    type="button"
                >
                    Rent
                </button>}
                <div>{item.available ? '' : 'Sorry, not available right now'}</div>
            </div>
        </div>
    )
};
export default ItemCard;