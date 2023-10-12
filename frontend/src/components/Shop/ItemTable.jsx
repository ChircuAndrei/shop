import { Link } from "react-router-dom";
import { useState } from "react";
import "./ItemTable.css";
import { useNavigate, useParams } from "react-router-dom";


const ItemTable = ({ items, onDelete }) => {
    const navigate = useNavigate();
    const [filterBy, setFilterBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState(true)

    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;

    console.log(items);

    const updateItem = (item) => {
        return fetch(`/items/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        }).then((res) => res.json());
    };
    const filteredItems = items.filter(item => {
        const position = item.name.toLowerCase();
        const level = item.price;
        return position.includes(filterBy) || level.includes(filterBy);
    });

    const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div className="container text-center" >
            <div className="row" >
                {itemsToDisplay.map((item) => (
                    <div className="col col-lg-2" key={item.id} style={{ marginTop: '20px' }} >

                        <div className="card border-dark" key={item.id} >
                            <img src={require(`./3.png`)} className="card-img-top" alt="picture" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">more text</p>
                                <p><Link to={`/update/${item.id}`}>
                                    <button type="button">Add to Cart</button>
                                </Link></p>
                                <p><a href="#" className="card-link">Card link</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default ItemTable;