import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div style={{ display: "flex", gap: 10 }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/trade">Trade</Link>
            <Link to="/orders">Orders</Link>
        </div>
    );
}