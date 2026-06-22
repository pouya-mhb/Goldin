import { useState } from "react";
import client from "../api/client";

export default function TradeWidget({
    refresh
}) {

    const [grams, setGrams] = useState("");

    const buyGold = async () => {

        const idempotencyKey =
            crypto.randomUUID();

        await client.post(
            "orders/buy/",
            {
                grams: Number(grams)
            },
            {
                headers: {
                    "Idempotency-Key":
                        idempotencyKey
                }
            }
        );

        refresh();
    };

    const sellGold = async () => {

        const idempotencyKey =
            crypto.randomUUID();

        await client.post(
            "orders/sell/",
            {
                grams: Number(grams)
            },
            {
                headers: {
                    "Idempotency-Key":
                        idempotencyKey
                }
            }
        );

        refresh();
    };

    return (
        <div className="card">

            <h2>خرید و فروش طلا</h2>

            <input
                type="number"
                placeholder="گرم"
                value={grams}
                onChange={(e) =>
                    setGrams(e.target.value)
                }
            />

            <div className="trade-buttons">

                <button
                    className="buy-btn"
                    onClick={buyGold}
                >
                    خرید
                </button>

                <button
                    className="sell-btn"
                    onClick={sellGold}
                >
                    فروش
                </button>

            </div>

        </div>
    );
}