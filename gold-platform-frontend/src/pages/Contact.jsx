import { useState } from "react";
import client from "../api/client";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // For now, just show success message
            // In production, you'd send this to a backend
            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            setError("خطا در ارسال پیام. دوباره تلاش کنید.");
        }
    };

    return (
        <div className="page-container">
            <section className="page-header">
                <h1>ارتباط با ما</h1>
                <p>سؤالاتتان را مطرح کنید - ما اینجا هستیم تا کمک کنیم</p>
            </section>

            <section className="contact-section">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>راه‌های ارتباطی</h3>

                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <div>
                                <h4>ایمیل</h4>
                                <p>support@goldin.ir</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <div>
                                <h4>تلفن</h4>
                                <p>۰۲۱-۹۸۰۰-۱۲۳۴</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span className="contact-icon">📍</span>
                            <div>
                                <h4>آدرس</h4>
                                <p>تهران، ایران</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {submitted && (
                            <div className="success-message">
                                ✓ پیام شما با موفقیت ارسال شد
                            </div>
                        )}
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label>نام</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>ایمیل</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>موضوع</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>پیام</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            ارسال پیام
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}