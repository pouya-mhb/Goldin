import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

client.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("access");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        if (
            config.method === "post"
        ) {
            config.headers[
                "Idempotency-Key"
            ] = crypto.randomUUID();
        }

        return config;
    }
);
export default client;