import {useEffect, useState} from "react";
import {Navbar} from "../components/Navbar/Navbar";
import Loading from "../components/Loading";

import Sidebar2 from "../components/Shop/Sidebar2";

import {Col, Row} from "react-bootstrap";
import ItemTable from "../components/Shop/ItemTable";
import Filterbar from "../components/Shop/Filterbar";


const fetchItems = () => {
    return fetch(`http://localhost:8080/items`).then((res) => res.json());
};
const deleteItem = (id) => {
    return fetch(`/items/${id}`, {method: "DELETE"}).then((res) =>
        res.json()
    );
};

const ItemList = () => {
    //   const {sortBy, sortOrder} = useParams();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState(null);
    const handleDelete = (id) => {
        deleteItem(id);

        setItems((items) => {
            return items.filter((item) => item.id !== id);
        });
    };

    useEffect(() => {
        fetchItems()
            .then(item => {
                setLoading(false);
                setItems(item);
            })

    }, []);
//sortBy, sortOrder
    if (loading) {
        return <Loading/>;
    }
    //console.log(items[1].name);
    return (

        <main className="content">
            <Navbar/>
            <div style={{display: 'flex'}} className="justify-content-center mt-3 mb-3">
                <Filterbar/>
            </div>
            <Row>
                <Col>
                    <ItemTable items={items}/>
                </Col>
            </Row>
        </main>
    );
};

export default ItemList;