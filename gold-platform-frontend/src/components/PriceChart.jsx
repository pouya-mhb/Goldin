import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import client from "../api/client";

export default function PriceChart({ defaultDays = 30 }) {
    const [selectedDays, setSelectedDays] = useState(defaultDays);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPriceHistory = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await client.get(`pricing/history/?days=${selectedDays}`);

                const formattedData = res.data.map((item) => ({
                    timestamp: new Date(item.timestamp),
                    time: new Date(item.timestamp).toLocaleDateString("fa-IR"),
                    buyPrice: Number(item.buy_price),
                    sellPrice: Number(item.sell_price),
                }));

                setData(formattedData);
            } catch (err) {
                console.error("Failed to load price history:", err);
                setError("خطا در بارگذاری تاریخچه قیمت");
            } finally {
                setLoading(false);
            }
        };

        loadPriceHistory();
    }, [selectedDays]);

    const handleDaysChange = (newDays) => {
        if (newDays === selectedDays) return;
        setSelectedDays(newDays);
    };

    if (loading) {
        return (
            <div className="card price-chart-container">
                <h2>نمودار قیمت طلا</h2>
                <div className="chart-loading">
                    <div className="spinner-small" />
                    <p>در حال بارگذاری نمودار...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card price-chart-container">
                <h2>نمودار قیمت طلا</h2>
                <div className="chart-error">{error}</div>
            </div>
        );
    }

    const minPrice = Math.min(...data.map((d) => d.sellPrice)) * 0.98;
    const maxPrice = Math.max(...data.map((d) => d.buyPrice)) * 1.02;

    return (
        <div className="card price-chart-container">
            <div className="chart-header">
                <h2>نمودار قیمت طلا</h2>
                <div className="chart-controls">
                    <button
                        className={`chart-btn ${selectedDays === 7 ? "active" : ""}`}
                        onClick={() => handleDaysChange(7)}
                    >
                        7 روز
                    </button>
                    <button
                        className={`chart-btn ${selectedDays === 30 ? "active" : ""}`}
                        onClick={() => handleDaysChange(30)}
                    >
                        30 روز
                    </button>
                    <button
                        className={`chart-btn ${selectedDays === 90 ? "active" : ""}`}
                        onClick={() => handleDaysChange(90)}
                    >
                        90 روز
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                    <XAxis
                        dataKey="time"
                        stroke="rgba(226, 232, 240, 0.5)"
                        style={{ fontSize: "0.85rem" }}
                    />
                    <YAxis
                        domain={[minPrice, maxPrice]}
                        stroke="rgba(226, 232, 240, 0.5)"
                        style={{ fontSize: "0.85rem" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(10, 24, 46, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "#e2e8f0",
                        }}
                        formatter={(value) => Number(value).toLocaleString("fa-IR")}
                        labelStyle={{ color: "#e2e8f0" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="buyPrice"
                        stroke="#34d399"
                        dot={false}
                        strokeWidth={2}
                        name="خرید"
                    />
                    <Line
                        type="monotone"
                        dataKey="sellPrice"
                        stroke="#f97316"
                        dot={false}
                        strokeWidth={2}
                        name="فروش"
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="chart-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#34d399" }} />
                    <span>قیمت خرید</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#f97316" }} />
                    <span>قیمت فروش</span>
                </div>
            </div>
        </div>
    );
}
