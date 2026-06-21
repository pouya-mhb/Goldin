import client from "./client";

export const login = (phone, password) => {
    return client.post("token/", {
        phone,
        password,
    });
};