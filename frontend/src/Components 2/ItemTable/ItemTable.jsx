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
        <div className="ItemTable">
            <table>
                <thead>
                <tr>
                    <th><button onClick={() =>
                    {
                        if (sort) {
                            navigate("/name/asc")
                            setSort(false);
                        } else {
                            navigate("/name/desc")
                            setSort(true)
                        }
                    }} type="button">Name</button></th>
                    <th>Level</th>
                    <th>Position</th>
                    <th>Favourite Color</th>
                    <th>Equipment</th>
                    <th>Attendance</th>
                    <th><input
                        placeholder="Filter By Level/Position"
                        onChange={(e) => {
                            e.preventDefault();
                            setFilterBy(e.target.value)
                        }}
                    />
                    </th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {itemsToDisplay.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>

                        <td> <input
                            type="checkbox"
                            onClick={() => {
                                item.present = !item.present
                                updateItem(item);
                            }}
                        /></td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button type="button">Update</button>
                            </Link>
                            <button type="button" onClick={() => onDelete(item.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= items.length}
                >
                    Next
                </button>
            </div>
        </div>
    );

}

export default ItemTable;