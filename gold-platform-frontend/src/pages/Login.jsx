import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { loginUser } = useAuth();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const data = await login(phone, password);

            loginUser(
                data.access,
                data.refresh
            );

            navigate("/dashboard");

        } catch (err) {
            console.error(err);

            setError("شماره موبایل یا رمز عبور اشتباه است");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo-section">
                    <h1>Goldin</h1>
                    <p>سامانه خرید و فروش آنلاین طلا</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>شماره موبایل</label>

                        <input
                            type="text"
                            placeholder="09123456789"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>رمز عبور</label>

                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {error && (
                        <div className="error-box">
                            {error}
                        </div>
                    )}

                    <button
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "در حال ورود..." : "ورود"}
                    </button>

                </form>

            </div>

        </div>
    );
}