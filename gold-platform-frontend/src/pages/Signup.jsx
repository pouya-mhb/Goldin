import { useState } from "react";

import { registerUser } from "../api/auth";

import { useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate =
        useNavigate();

    const [phone, setPhone] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await registerUser({
                phone,
                password,
            });

            alert(
                "Registration successful"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Sign Up"
                        }
                    </button>

                </form>

            </div>

        </div>

    );
}