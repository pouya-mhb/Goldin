import { useEffect, useState } from "react";
import client from "../api/client";

export default function Deposits() {
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDeposits = async () => {
        try {
            setLoading(true);

            const response = await client.get("payments/deposits/");

            setDeposits(response.data);
        } catch (err) {
            console.error(err);
            setError("خطا در دریافت لیست واریزها");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeposits();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "SUCCESS":
                return "#16a34a";

            case "FAILED":
                return "#dc2626";

            default:
                return "#f59e0b";
        }
    };

    if (loading) {
        return (
            <div style={styles.page}>
                <h2>در حال بارگذاری...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.page}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1>واریزها</h1>

                <button onClick={loadDeposits} style={styles.refreshBtn}>
                    بروزرسانی
                </button>
            </div>

            {deposits.length === 0 ? (
                <div style={styles.empty}>
                    هیچ واریزی ثبت نشده است
                </div>
            ) : (
                <div style={styles.table}>
                    <div style={styles.tableHeader}>
                        <div>ID</div>
                        <div>مبلغ</div>
                        <div>وضعیت</div>
                        <div>تاریخ</div>
                    </div>

                    {deposits.map((deposit) => (
                        <div key={deposit.id} style={styles.row}>
                            <div>{deposit.id}</div>

                            <div>
                                {Number(deposit.amount).toLocaleString()}
                                {" "}
                                تومان
                            </div>

                            <div>
                                <span
                                    style={{
                                        ...styles.badge,
                                        background: getStatusColor(deposit.status),
                                    }}
                                >
                                    {deposit.status}
                                </span>
                            </div>

                            <div>
                                {new Date(
                                    deposit.created_at
                                ).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
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

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
    },

    refreshBtn: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    empty: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
    },

    table: {
        background: "#1e293b",
        borderRadius: "12px",
        overflow: "hidden",
    },

    tableHeader: {
        display: "grid",
        gridTemplateColumns: "80px 1fr 150px 250px",
        padding: "15px",
        fontWeight: "bold",
        background: "#334155",
    },

    row: {
        display: "grid",
        gridTemplateColumns: "80px 1fr 150px 250px",
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