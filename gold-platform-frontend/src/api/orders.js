import client from "./client";

export const buyGold = (grams, idempotencyKey) => {
    return client.post(
        "orders/buy/",
        { grams },
        {
            headers: {
                "Idempotency-Key": idempotencyKey,
            },
        }
    );
};

export const sellGold = (grams) => {
    return client.post("orders/sell/", { grams });
};

export const getOrders = () => {
    return client.get("orders/history/");
};