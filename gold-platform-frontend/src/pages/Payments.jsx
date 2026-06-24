import { useState, useEffect } from "react";
import client from "../api/client";

export default function Payments() {
    const [amount, setAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [bankAccountId, setBankAccountId] = useState("");

    const [deposits, setDeposits] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);

    const [loading, setLoading] = useState(false);

    // 💰 CREATE DEPOSIT
    const createDeposit = async () => {
        setLoading(true);

        try {
            const res = await client.post("payments/deposit/", {
                amount: amount,
            });

            alert("Deposit created: " + res.data.deposit_id);
            setAmount("");
        } catch (err) {
            console.log(err);
            alert("Deposit failed");
        } finally {
            setLoading(false);
        }
    };

    // 💸 CREATE WITHDRAWAL
    const createWithdrawal = async () => {
        setLoading(true);

        try {
            const res = await client.post("payments/withdraw/", {
                amount: withdrawAmount,
                bank_account_id: bankAccountId,
            });

            alert("Withdrawal created: " + res.data.withdrawal_id);
            setWithdrawAmount("");
        } catch (err) {
            console.log(err);
            alert("Withdrawal failed");
        } finally {
            setLoading(false);
        }
    };

    // 📊 LOAD DATA (optional if you add endpoints later)
    const fetchData = async () => {
        try {
            const wit = await client.get("payments/withdrawals/");

            setDeposits(dep.data);
            setWithdrawals(wit.data);
        } catch (err) {
            console.log("No list endpoints yet");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={styles.container}>

            <h2>💳 Payments Dashboard</h2>

            {/* DEPOSIT */}
            <div style={styles.card}>
                <h3>واریز کیف پول</h3>

                <input
                    placeholder="مقدار واریز"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />

                <button onClick={createDeposit} style={styles.button}>
                    واریز
                </button>
            </div>

            {/* WITHDRAWAL */}
            <div style={styles.card}>
                <h3>برداشت وجه</h3>

                <input
                    placeholder="مقدار برداشت"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="شناسه بانک"
                    value={bankAccountId}
                    onChange={(e) => setBankAccountId(e.target.value)}
                    style={styles.input}
                />

                <button onClick={createWithdrawal} style={styles.button}>
                    درخواست برداشت
                </button>
            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
        fontFamily: "sans-serif",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
    },

    card: {
        background: "#1e293b",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "12px",
    },

    input: {
        display: "block",
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        border: "none",
    },

    button: {
        padding: "10px 15px",
        background: "#22c55e",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
    },
};