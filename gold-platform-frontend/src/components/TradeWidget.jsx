import { useState } from "react";
import client from "../api/client";

export default function TradeWidget({
    refresh,
    onToast
}) {

    const [grams, setGrams] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateGrams = () => {
        const amount = Number(grams);
        if (!grams || Number.isNaN(amount) || amount <= 0) {
            return false;
        }
        return true;
    };

    const submitTrade = async (type) => {
        if (!validateGrams()) {
            const message = "لطفا مقدار معتبر به گرم وارد کنید.";
            setError(message);
            onToast?.(message, "error");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const endpoint = type === "buy" ? "orders/buy/" : "orders/sell/";
            const verb = type === "buy" ? "خرید" : "فروش";

            await client.post(endpoint, {
                grams: Number(grams)
            });

            onToast?.(`سفارش ${verb} با موفقیت ثبت شد.`, "success");
            setGrams("");
            refresh();
        } catch (err) {
            const message = err?.response?.data?.detail || "خطا در ثبت سفارش. دوباره تلاش کنید.";
            setError(message);
            onToast?.(message, "error");
            console.error(type === "buy" ? "Buy error:" : "Sell error:", err);
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = validateGrams() && !loading;

    return (
        <div className="card trade-widget">

            <h2>خرید و فروش طلا</h2>
            <p className="trade-description">
                مقدار را به گرم وارد کنید و سپس یکی از گزینه‌ها را انتخاب کنید.
            </p>

            <input
                type="number"
                placeholder="گرم"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                min="0"
                step="0.01"
            />

            {error && <div className="input-error">{error}</div>}

            <div className="trade-buttons">

                <button
                    className="buy-btn"
                    onClick={() => submitTrade("buy")}
                    disabled={!canSubmit}
                >
                    {loading ? "در حال پردازش..." : "خرید"}
                </button>

                <button
                    className="sell-btn"
                    onClick={() => submitTrade("sell")}
                    disabled={!canSubmit}
                >
                    {loading ? "در حال پردازش..." : "فروش"}
                </button>

            </div>

        </div>
    );
}