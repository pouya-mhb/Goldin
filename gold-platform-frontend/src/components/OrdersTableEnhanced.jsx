import { useState, useMemo } from "react";

export default function OrdersTableEnhanced({ orders }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("ALL");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [sortBy, setSortBy] = useState("date");

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        // Filter by type
        if (filterType !== "ALL") {
            result = result.filter(
                (o) => o.order_type === filterType || o.type === filterType
            );
        }

        // Filter by status
        if (filterStatus !== "ALL") {
            result = result.filter((o) => o.status === filterStatus);
        }

        // Search by grams or ID
        if (searchTerm) {
            result = result.filter(
                (o) =>
                    String(o.grams).includes(searchTerm) ||
                    String(o.id).includes(searchTerm) ||
                    String(o.total_price).includes(searchTerm)
            );
        }

        // Sort
        if (sortBy === "date") {
            result.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        } else if (sortBy === "amount") {
            result.sort((a, b) => Number(b.grams) - Number(a.grams));
        } else if (sortBy === "price") {
            result.sort(
                (a, b) => Number(b.total_price) - Number(a.total_price)
            );
        }

        return result;
    }, [orders, searchTerm, filterType, filterStatus, sortBy]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "COMPLETED":
                return "status-completed";
            case "RESERVED":
                return "status-reserved";
            case "PENDING":
                return "status-pending";
            case "PROCESSING":
                return "status-processing";
            case "FAILED":
                return "status-failed";
            case "CANCELED":
                return "status-canceled";
            default:
                return "status-default";
        }
    };

    const getTypeLabel = (type) => {
        const typeKey = String(type).toUpperCase();
        return typeKey === "BUY" ? "خرید" : typeKey === "SELL" ? "فروش" : type;
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            COMPLETED: "تکمیل شده",
            RESERVED: "رزرو شده",
            PENDING: "در انتظار",
            PROCESSING: "در حال انجام",
            FAILED: "ناموفق",
            CANCELED: "لغو شده",
        };
        return statusMap[status] || status;
    };

    return (
        <div className="card orders-container">
            <div className="orders-header">
                <h2>تاریخچه سفارشات</h2>
                <div className="orders-count">
                    {filteredOrders.length} از {orders.length} سفارش
                </div>
            </div>

            {/* Filters and Search */}
            <div className="orders-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="جستجو: شناسه، مقدار یا قیمت"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">همه انواع</option>
                        <option value="BUY">خرید</option>
                        <option value="SELL">فروش</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="ALL">همه وضعیت‌ها</option>
                        <option value="COMPLETED">تکمیل شده</option>
                        <option value="RESERVED">رزرو شده</option>
                        <option value="PENDING">در انتظار</option>
                        <option value="PROCESSING">در حال انجام</option>
                        <option value="FAILED">ناموفق</option>
                        <option value="CANCELED">لغو شده</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="date">تازه‌ترین اول</option>
                        <option value="amount">بیشترین مقدار</option>
                        <option value="price">بیشترین قیمت</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            {filteredOrders.length > 0 ? (
                <div className="table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>شناسه</th>
                                <th>نوع</th>
                                <th>مقدار (گرم)</th>
                                <th>قیمت (تومان)</th>
                                <th>وضعیت</th>
                                <th>تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id">#{order.id}</td>
                                    <td>
                                        <span
                                            className={`type-badge type-${String(order.order_type || order.type).toUpperCase() ===
                                                    "BUY"
                                                    ? "buy"
                                                    : "sell"
                                                }`}
                                        >
                                            {getTypeLabel(order.order_type || order.type)}
                                        </span>
                                    </td>
                                    <td className="amount">
                                        {Number(order.grams).toFixed(2)}
                                    </td>
                                    <td className="price">
                                        {Number(order.total_price).toLocaleString("fa-IR")}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td className="date">
                                        {new Date(order.created_at).toLocaleDateString("fa-IR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-results">
                    <p>سفارشی با این شرایط یافت نشد</p>
                </div>
            )}
        </div>
    );
}
