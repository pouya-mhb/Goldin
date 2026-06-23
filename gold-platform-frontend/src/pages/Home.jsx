import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>سامانه خرید و فروش طلا</h1>
                    <p>یک پلتفرم ایمن و قابل اعتماد برای معاملات طلا</p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn btn-primary">
                            شروع معاملات
                        </Link>
                        <Link to="/about" className="btn btn-secondary">
                            بیشتر بدانید
                        </Link>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <h2>ویژگی‌های Goldin</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">💎</div>
                        <h3>قیمت‌های لحظه‌ای</h3>
                        <p>دسترسی به آخرین قیمت‌های طلا بدون تاخیر</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>امنیت بالا</h3>
                        <p>رمزنگاری و حفاظت کامل اطلاعات شما</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>تحلیل‌ها و نمودارها</h3>
                        <p>ابزار‌های پیشرفته برای تحلیل روند قیمت‌ها</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>سرعت و کارایی</h3>
                        <p>معاملات فوری و بدون تاخیر</p>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stat-item">
                    <h3>۱۰۰۰+</h3>
                    <p>کاربر فعال</p>
                </div>
                <div className="stat-item">
                    <h3>۵۰۰+</h3>
                    <p>معامله روزانه</p>
                </div>
                <div className="stat-item">
                    <h3>۲۴/۷</h3>
                    <p>پشتیبانی</p>
                </div>
            </section>

            <section className="cta-section">
                <h2>آماده‌ای برای شروع؟</h2>
                <p>امروز ثبت‌نام کن و از تمام مزایا بهره‌مند شو</p>
                <Link to="/login" className="btn btn-lg btn-primary">
                    ایجاد حساب
                </Link>
            </section>
        </div>
    );
}
