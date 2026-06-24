import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navigation() {
    const location = useLocation();
    const { isAuthenticated, logoutUser } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">◆</span> Goldin
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    ☰
                </button>

                <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive("/") ? "active" : ""}`}
                    >
                        خانه
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${isActive("/about") ? "active" : ""}`}
                    >
                        درباره ما
                    </Link>
                    <Link
                        to="/blog"
                        className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                    >
                        بلاگ
                    </Link>
                    <Link
                        to="/contact"
                        className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                    >
                        ارتباط با ما
                    </Link>

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/account"
                                className={`nav-link ${isActive("/account") ? "active" : ""}`}
                            >
                                اکانت
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`nav-link ${isActive("/account") ? "active" : ""}`}
                            >
                                داشبورد
                            </Link>
                            <Link
                                to="/payments"
                                className={`nav-link ${isActive("/payments") ? "active" : ""}`}
                            >
                                پرداخت‌
                            </Link>
                            <Link to="/deposits"
                                className={`nav-link ${isActive("/settings") ? "active" : ""}`}>
                                واریزها
                            </Link>
                            <Link to="/withdrawals"
                                className={`nav-link ${isActive("/settings") ? "active" : ""}`}>
                                برداشت ها
                            </Link>
                            <Link
                                to="/settings"
                                className={`nav-link ${isActive("/settings") ? "active" : ""}`}
                            >
                                تنظیمات
                            </Link>
                            <button className="nav-logout-btn" onClick={handleLogout}>
                                خروج
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <>
                            <Link to="/login" className="nav-link-btn login">
                                ورود
                            </Link>
                            <Link to="/dashboard" className="nav-link-btn signup">
                                داشبورد
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
