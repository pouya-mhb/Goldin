import { useState } from "react";
import { buyGold, sellGold } from "../api/orders";

export default function Trade() {
    const [grams, setGrams] = useState("");

    const handleBuy = async () => {
        try {
            await buyGold(grams, crypto.randomUUID());
            alert("Buy successful");
        } catch (e) {
            alert("Buy failed");
        }
    };

    const handleSell = async () => {
        try {
            await sellGold(grams);
            alert("Sell successful");
        } catch (e) {
            alert("Sell failed");
        }
    };

    return (
        <div>
            <h2>Trade Gold</h2>

            <input
                placeholder="grams"
                onChange={(e) => setGrams(e.target.value)}
            />

            <button onClick={handleBuy}>
                Buy
            </button>

            <button onClick={handleSell}>
                Sell
            </button>
        </div>
    );
}