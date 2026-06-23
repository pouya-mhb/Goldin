import { useEffect, useState } from "react";
import client from "../api/client";

export default function PortfolioPerformance() {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPortfolioData = async () => {
            try {
                setLoading(true);
                const walletRes = await client.get("wallet/");
                const priceRes = await client.get("pricing/current/");
                const ordersRes = await client.get("orders/history/");

                const wallet = walletRes.data;
                const price = priceRes.data;
                const orders = ordersRes.data;

                // Calculate total assets value
                const goldValue = Number(wallet.gold_balance) * Number(price.buy_price);
                const totalValue = Number(wallet.irt_balance) + goldValue;

                // Calculate total invested (sum of buy orders)
                const totalInvested = orders
                    .filter((o) => o.type === "BUY" && o.status === "COMPLETED")
                    .reduce((sum, o) => sum + Number(o.total_price), 0);

                // Calculate returns
                const returns = totalInvested > 0 ? totalValue - totalInvested : 0;
                const returnPercentage =
                    totalInvested > 0 ? ((returns / totalInvested) * 100).toFixed(2) : 0;

                setPortfolio({
                    irtBalance: wallet.irt_balance,
                    goldBalance: wallet.gold_balance,
                    goldValue,
                    totalValue,
                    totalInvested,
                    returns,
                    returnPercentage,
                    currentPrice: price.buy_price,
                    lockedIRT: wallet.irt_locked,
                    lockedGold: wallet.gold_locked,
                });
            } catch (err) {
                console.error("Failed to load portfolio data:", err);
                setError("خطا در بارگذاری اطلاعات پورتفولیو");
            } finally {
                setLoading(false);
            }
        };

        loadPortfolioData();
    }, []);

    if (loading) {
        return (
            <div className="portfolio-grid">
                <div className="portfolio-card loading">
                    <div className="spinner-small" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="portfolio-grid">
                <div className="portfolio-card error">{error}</div>
            </div>
        );
    }

    if (!portfolio) return null;

    const returnColor = portfolio.returns >= 0 ? "success" : "danger";

    return (
        <div className="portfolio-section">
            <h2 className="portfolio-title">وضعیت پورتفولیو</h2>

            <div className="portfolio-grid">
                {/* Total Value Card */}
                <div className="portfolio-card primary">
                    <div className="card-label">ارزش کل دارایی</div>
                    <div className="card-value">
                        {Math.round(portfolio.totalValue).toLocaleString("fa-IR")}
                    </div>
                    <div className="card-currency">تومان</div>
                </div>

                {/* IRT Balance */}
                <div className="portfolio-card">
                    <div className="card-label">موجودی ریالی</div>
                    <div className="card-value">
                        {Math.round(portfolio.irtBalance).toLocaleString("fa-IR")}
                    </div>
                    <div className="card-currency">تومان</div>
                    {portfolio.lockedIRT > 0 && (
                        <div className="card-locked">
                            در انتظار: {Math.round(portfolio.lockedIRT).toLocaleString("fa-IR")}
                        </div>
                    )}
                </div>

                {/* Gold Balance */}
                <div className="portfolio-card">
                    <div className="card-label">موجودی طلا</div>
                    <div className="card-value">
                        {portfolio.goldBalance.toFixed(2)}
                    </div>
                    <div className="card-currency">گرم</div>
                    {portfolio.lockedGold > 0 && (
                        <div className="card-locked">
                            در انتظار: {portfolio.lockedGold.toFixed(2)} گرم
                        </div>
                    )}
                </div>

                {/* Returns Card */}
                <div className={`portfolio-card return-${returnColor}`}>
                    <div className="card-label">بازده</div>
                    <div className="card-value">
                        {Math.round(portfolio.returns).toLocaleString("fa-IR")}
                    </div>
                    <div className="card-percentage">
                        {portfolio.returnPercentage}%
                    </div>
                </div>
            </div>

            <div className="portfolio-details">
                <div className="detail-row">
                    <span className="detail-label">سرمایه اولیه:</span>
                    <span className="detail-value">
                        {Math.round(portfolio.totalInvested).toLocaleString("fa-IR")} تومان
                    </span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">قیمت فعلی طلا:</span>
                    <span className="detail-value">
                        {Number(portfolio.currentPrice).toLocaleString("fa-IR")} تومان/گرم
                    </span>
                </div>
            </div>
        </div>
    );
}
