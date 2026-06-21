import client from "./client";

export const getWallet = () => {
    return client.get("wallet/");
};