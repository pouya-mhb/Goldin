import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.data);
        });
    }, []);

    return (
        <div>
            <h2>Orders</h2>

            {orders.map((o) => (
                <div key={o.id}>
                    <p>{o.type}</p>
                    <p>{o.grams}</p>
                    <p>{o.total_price}</p>
                    <p>{o.status}</p>
                </div>
            ))}
        </div>
    );
}