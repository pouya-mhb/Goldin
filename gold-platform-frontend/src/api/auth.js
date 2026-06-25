import client from "./client";

export const login = async (phone, password) => {
    const response = await client.post("token/", {
        phone,
        password,
    });

    return response.data;
};

export const logout = async (refresh) => {
    const response = await client.post("token/logout/", {
        refresh,
    });

    return response.data;
};

export const registerUser = async (data) => {
    const response = await client.post(
        "accounts/register/",
        data
    );

    return response.data;
};