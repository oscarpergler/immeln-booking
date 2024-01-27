import * as React from 'react';
import '../styles/nav.css';
import { Link, useLocation } from "react-router-dom";

function Navigation() {

    const location = useLocation();

    return (
        <div className="nav">
            <Link to="/" className={location.pathname.endsWith("/") ? "nav-item active" : "nav-item"}>
                <div>Boka</div>
            </Link>
            <Link to="/overview" className={location.pathname.startsWith("/overview") ? "nav-item active" : "nav-item"}>  
                <div>Överblick</div>
            </Link>
            <Link to="/admin" className={location.pathname.startsWith("/admin") ? "nav-item active" : "nav-item"}>
                <div>Admin</div>
            </Link>
            <Link to="/account" className={location.pathname.startsWith("/account") ? "nav-item active" : "nav-item"}>
                <div>Mitt konto</div>
            </Link>
        </div>
    );
}

export default Navigation;