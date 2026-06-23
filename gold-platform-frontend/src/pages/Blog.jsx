import { Link } from "react-router-dom";

const mockPosts = [
    {
        id: 1,
        title: "آغاز سفر سرمایه‌گذاری در طلا",
        excerpt: "نکاتی برای شروع‌کنندگان در بازار طلا",
        date: "۱۴۰۲/۰۱/۱۵",
        author: "علی محمدی",
        category: "آموزش",
    },
    {
        id: 2,
        title: "تحلیل روند قیمت‌های طلا در ۶ ماه اخیر",
        excerpt: "نگاهی به عوامل موثر بر قیمت طلا",
        date: "۱۴۰۲/۰۲/۰۸",
        author: "فاطمه احمدی",
        category: "تحلیل",
    },
    {
        id: 3,
        title: "اشتباهاتی که سرمایه‌گذاران می‌کنند",
        excerpt: "روش‌های صحیح برای اجتناب از خطرات",
        date: "۱۴۰۲/۰۲/۲۲",
        author: "محمد رضایی",
        category: "نکات",
    },
];

export default function Blog() {
    return (
        <div className="page-container">
            <section className="page-header">
                <h1>بلاگ Goldin</h1>
                <p>نکات، تحلیل‌ها و آخرین اخبار بازار طلا</p>
            </section>

            <section className="blog-section">
                <div className="blog-grid">
                    {mockPosts.map((post) => (
                        <article key={post.id} className="blog-card">
                            <div className="blog-category">{post.category}</div>
                            <h3>{post.title}</h3>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <div className="blog-meta">
                                <span className="blog-author">نویسنده: {post.author}</span>
                                <span className="blog-date">{post.date}</span>
                            </div>
                            <Link to={`/blog/${post.id}`} className="btn-read-more">
                                ادامه بخوانید →
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}