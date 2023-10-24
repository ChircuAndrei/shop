import { useEffect, useState } from "react";
import ItemTable from "../components/Shop/ItemTable";
import Loading from "../components/Loading";
import Topbar from "./global/Topbar";


const fetchItems = () => {
    return fetch(`http://localhost:8080/items`).then((res) => res.json());
};
const deleteItem = (id) => {
    return fetch(`/items/${id}`, { method: "DELETE" }).then((res) =>
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
        return <Loading />;
    }
    //console.log(items[1].name);
    return (
        <main className="content">
            <Topbar />
            <ItemTable items={items} onDelete={handleDelete} />
        </main>
    );
};

export default ItemList;