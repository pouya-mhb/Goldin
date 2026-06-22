export default function OrdersTable({
    orders
}) {

    return (

        <div className="card">

            <h2>آخرین سفارشات</h2>

            <table>

                <thead>

                    <tr>
                        <th>نوع</th>
                        <th>مقدار</th>
                        <th>قیمت</th>
                        <th>وضعیت</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map(order => (

                        <tr key={order.id}>

                            <td>{order.order_type}</td>

                            <td>{order.grams}</td>

                            <td>
                                {Number(
                                    order.total_price
                                ).toLocaleString()}
                            </td>

                            <td>{order.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}