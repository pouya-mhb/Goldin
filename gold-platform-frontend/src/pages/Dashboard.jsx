import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import client from "../api/client";
import { useAuth } from "../context/AuthContext";

import BalanceCard from "../components/BalanceCard";
import PriceCard from "../components/PriceCard";
import TradeWidget from "../components/TradeWidget";
import OrdersTable from "../components/OrdersTable";

export default function Dashboard() {

    const [wallet, setWallet] = useState(null);

    const [price, setPrice] = useState(null);

    const [orders, setOrders] = useState([]);

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const loadData = async () => {

        const walletRes =
            await client.get("wallet/");

        const priceRes =
            await client.get("pricing/current/");

        const orderRes =
            await client.get("orders/history/");

        setWallet(walletRes.data);

        setPrice(priceRes.data);

        setOrders(orderRes.data);
    };

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    useEffect(() => {

        loadData();

    }, []);

    if (!wallet || !price) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
                <p>در حال بارگذاری اطلاعات...</p>
            </div>
        );
    }

    return (

        <div className="dashboard">

            <header className="dashboard-header">
                <div className="dashboard-hero">
                    <p className="eyebrow">پورتال معاملات طلا</p>
                    <div className="dashboard-top-row">
                        <h1>داشبورد گلدین</h1>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            خروج
                        </button>
                    </div>
                    <p className="dashboard-description">
                        وضعیت موجودی و قیمت‌ها را در یک نمای شفاف و سریع ببینید.
                    </p>
                </div>
            </header>

            <div className="grid">

                <BalanceCard
                    title="موجودی ریالی"
                    value={wallet.irt_balance}
                    unit="تومان"
                />

                <BalanceCard
                    title="موجودی طلا"
                    value={wallet.gold_balance}
                    unit="گرم"
                />

                <PriceCard
                    title="قیمت خرید"
                    value={price.buy_price}
                />

                <PriceCard
                    title="قیمت فروش"
                    value={price.sell_price}
                />

            </div>

            <TradeWidget
                refresh={loadData}
            />

            <OrdersTable
                orders={orders}
            />

        </div>
    );
}