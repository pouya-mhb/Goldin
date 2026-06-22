import client from "./client";

export const login = async (phone, password) => {

    const response = await client.post("token/", {
        phone,
        password,
    });

    return response.data;
};