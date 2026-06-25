import api from "./client";

export const openAccount = async () => {
    const response = await api.post("/accounts/open/");
    return response.data;
};

export const approveAccount = async (requestId) => {
    const response = await api.post(
        `/accounts/open/${requestId}/approve/`
    );

    return response.data;
};
