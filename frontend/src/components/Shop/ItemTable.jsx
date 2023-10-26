import {Link} from "react-router-dom";
import {useState} from "react";
import "./ItemTable.css";
import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import Sidebar2 from "./Sidebar2";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const ItemTable = ({items, onDelete}) => {
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
        <Row>
            {items.map((item, index) => (
                <Col key={index} style={{ marginTop: '20px', marginLeft: '10px' }} >
                    <Card key={item.id} style={{width: '10rem'}}>
                        {/* You can add your item-specific data here */}
                        <Card.Img variant="top" src={require(`./3.png`)}/>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );

}

export default ItemTable;