import { useEffect, useState } from "react";
import { getWallet } from "../api/wallet";

export default function Dashboard() {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        getWallet().then((res) => {
            setWallet(res.data);
        });
    }, []);

    if (!wallet) return <div>Loading...</div>;

    return (
        <div>
            <h2>Dashboard</h2>

            <p>IRT Balance: {wallet.irt_balance}</p>
            <p>Gold Balance: {wallet.gold_balance} g</p>
        </div>
    );
}