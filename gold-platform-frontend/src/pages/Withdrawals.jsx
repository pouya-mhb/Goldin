import { useEffect, useState } from "react";
import client from "../api/client";

export default function Withdrawals() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadWithdrawals = async () => {
        try {
            const response = await client.get(
                "payments/withdrawals/"
            );

            setWithdrawals(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWithdrawals();
    }, []);

    const statusColor = (status) => {

        switch (status) {

            case "COMPLETED":
                return "#16a34a";

            case "REJECTED":
                return "#dc2626";

            case "PROCESSING":
                return "#2563eb";

            default:
                return "#f59e0b";
        }
    };

    if (loading) {
        return <h2>در حال بارگذاری...</h2>;
    }

    return (
        <div style={styles.page}>
            <h1>برداشت‌ها</h1>

            <div style={styles.table}>

                <div style={styles.header}>
                    <div>ID</div>
                    <div>مبلغ</div>
                    <div>بانک</div>
                    <div>وضعیت</div>
                    <div>تاریخ</div>
                </div>

                {withdrawals.map((item) => (
                    <div
                        key={item.id}
                        style={styles.row}
                    >
                        <div>{item.id}</div>

                        <div>
                            {Number(item.amount).toLocaleString()}
                        </div>

                        <div>{item.bank_name}</div>

                        <div>
                            <span
                                style={{
                                    ...styles.badge,
                                    background: statusColor(
                                        item.status
                                    ),
                                }}
                            >
                                {item.status}
                            </span>
                        </div>

                        <div>
                            {new Date(
                                item.created_at
                            ).toLocaleString()}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: "30px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
    },

    table: {
        background: "#1e293b",
        borderRadius: "12px",
        overflow: "hidden",
    },

    header: {
        display: "grid",
        gridTemplateColumns:
            "80px 1fr 1fr 150px 250px",
        padding: "15px",
        fontWeight: "bold",
        background: "#334155",
    },

    row: {
        display: "grid",
        gridTemplateColumns:
            "80px 1fr 1fr 150px 250px",
        padding: "15px",
        borderTop: "1px solid #475569",
    },

    badge: {
        padding: "6px 12px",
        borderRadius: "8px",
        color: "white",
        fontSize: "12px",
    },
};