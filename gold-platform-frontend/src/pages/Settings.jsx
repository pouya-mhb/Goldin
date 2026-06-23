import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
    const { isAuthenticated } = useAuth();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        priceAlerts: true,
        theme: "dark",
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!isAuthenticated) {
        return (
            <div className="page-container">
                <div className="auth-required">
                    <p>برای دسترسی به این صفحه، لطفا وارد شوید</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <section className="page-header">
                <h1>تنظیمات</h1>
                <p>تنظیمات حساب و اطلاعات خود را مدیریت کنید</p>
            </section>

            <section className="settings-section">
                <div className="settings-card">
                    <h2>اطلاع‌رسانی</h2>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                            />
                            اطلاع‌رسانی از طریق ایمیل
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                name="smsNotifications"
                                checked={settings.smsNotifications}
                                onChange={handleChange}
                            />
                            اطلاع‌رسانی از طریق پیامک
                        </label>
                    </div>
                    <div className="setting-item">
                        <label>
                            <input
                                type="checkbox"
                                name="priceAlerts"
                                checked={settings.priceAlerts}
                                onChange={handleChange}
                            />
                            هشدار تغییر قیمت‌ها
                        </label>
                    </div>
                </div>

                <div className="settings-card">
                    <h2>ظاهر</h2>
                    <div className="setting-item">
                        <label>تم</label>
                        <select name="theme" value={settings.theme} onChange={handleChange}>
                            <option value="dark">تاریک</option>
                            <option value="light">روشن</option>
                        </select>
                    </div>
                </div>

                {saved && <div className="success-banner">✓ تنظیمات ذخیره شد</div>}

                <button className="btn btn-primary" onClick={handleSave}>
                    ذخیره تنظیمات
                </button>
            </section>
        </div>
    );
}