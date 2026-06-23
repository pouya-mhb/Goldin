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

import ProtectedRoute from "../components/ProtectedRoute";

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
                    path="/login"
                    element={<Login />}
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

            </Routes>

        </BrowserRouter>
    );
}