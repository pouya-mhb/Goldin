import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Account from "../pages/Account";
import Settings from "../pages/Settings";
import Navigation from "../components/Navigation";
import Payments from "../pages/Payments";
import Deposits from "../pages/Deposits";
import Withdrawals from "../pages/Withdrawals";
import ProtectedRoute from "../components/ProtectedRoute";
import AccountOpeningPage from "../pages/AccountOpeningPage";
import Signup from "../pages/Signup";


export default function AppRouter() {

    return (

        <BrowserRouter>
            <Navigation />
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/open-account"
                    element={<AccountOpeningPage />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/blog"
                    element={<Blog />}
                />

                <Route
                    path="/account"
                    element={<Account />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="/payments"
                    element={<Payments />} />

                <Route
                    path="/deposits"
                    element={<Deposits />}
                />

                <Route
                    path="/withdrawals"
                    element={<Withdrawals />}
                />

            </Routes>

        </BrowserRouter >
    );
}