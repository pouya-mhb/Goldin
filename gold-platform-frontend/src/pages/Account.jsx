import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import client from "../api/client";

export default function Account() {
    const { isAuthenticated } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const res = await client.get("profile/");
                setUser(res.data);
            } catch (err) {
                console.error("Failed to load user data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            loadUserData();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="page-container">
                <div className="auth-required">
                    <p>برای دسترسی به این صفحه، لطفا وارد شوید</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">در حال بارگذاری...</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <section className="page-header">
                <h1>حساب کاربری</h1>
                <p>مدیریت اطلاعات حساب خود</p>
            </section>

            <section className="account-section">
                <div className="account-card">
                    <h2>اطلاعات حساب</h2>
                    <div className="account-info">
                        <div className="info-item">
                            <label>نام</label>
                            <p>{user?.phone || "---"}</p>
                        </div>
                        <div className="info-item">
                            <label>شماره موبایل</label>
                            <p>{user?.phone || "---"}</p>
                        </div>
                        <div className="info-item">
                            <label>تاریخ عضویت</label>
                            <p>
                                {user?.date_joined
                                    ? new Date(user.date_joined).toLocaleDateString("fa-IR")
                                    : "---"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="account-card">
                    <h2>فعالیت اخیر</h2>
                    <div className="activity-list">
                        <p className="placeholder">هیچ فعالیتی ثبت نشده است</p>
                    </div>
                </div>
            </section>
        </div>
    );
}