import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    FiMenu,
    FiX,
    FiLogOut,
    FiCalendar,
    FiUser,
    FiChevronDown,
} from "react-icons/fi";
import "./Navbar.css";

const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
];

function readUser() {
    try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function initialsFor(name = "") {
    const parts = String(name).trim().split(/\s+/);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(readUser);
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuRef = useRef(null);

    // Re-read user when route changes (covers login/logout in another component).
    useEffect(() => {
        setUser(readUser());
        setMenuOpen(false);
        setDrawerOpen(false);
    }, [location.pathname]);

    // Listen to cross-tab logins/logouts.
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "user" || e.key === "token") setUser(readUser());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // Close dropdown on outside click.
    useEffect(() => {
        if (!menuOpen) return;
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [menuOpen]);

    // Lock body scroll when drawer is open.
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [drawerOpen]);

    const handleSectionClick = (e, id) => {
        e.preventDefault();
        setDrawerOpen(false);
        if (location.pathname !== "/") {
            navigate(`/#${id}`);
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 60);
            return;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setMenuOpen(false);
        setDrawerOpen(false);
<<<<<<< HEAD
        window.dispatchEvent(new CustomEvent("homehelper-auth-change"));
=======
>>>>>>> a25c3281fe06ab6659c22ce42fd9a8d8bee68563
        navigate("/");
    };

    const initials = user ? initialsFor(user.name) : "";

<<<<<<< HEAD
    // Drawer + scrim MUST NOT live inside <header className="nav">: that element uses
    // backdrop-filter, which in Chromium/WebKit creates a containing block for
    // position:fixed children — the drawer gets clipped to the ~70px-tall header.
    return (
        <>
=======
    return (
>>>>>>> a25c3281fe06ab6659c22ce42fd9a8d8bee68563
        <header className="nav">
            <div className="container nav-inner">
                <Link to="/" className="nav-brand" aria-label="HomeHelper home">
                    <span className="nav-brand-mark">HH</span>
                    <span className="nav-brand-name">HomeHelper</span>
                </Link>

                <nav className="nav-links" aria-label="Primary">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            className="nav-link"
                            href={`/#${item.id}`}
                            onClick={(e) => handleSectionClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    ))}
                    {user && (
                        <NavLink
                            to="/my-bookings"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " is-active" : "")
                            }
                        >
                            My bookings
                        </NavLink>
                    )}
                </nav>

                <div className="nav-actions">
                    {!user ? (
                        <Link to="/login" className="btn btn-primary nav-cta">
                            Login
                        </Link>
                    ) : (
                        <div className="user-menu" ref={menuRef}>
                            <button
                                type="button"
                                className="user-trigger"
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <span className="avatar" aria-hidden="true">{initials}</span>
                                <span className="user-name">{user.name || "Account"}</span>
                                <FiChevronDown aria-hidden="true" />
                            </button>

                            {menuOpen && (
                                <div className="user-dropdown" role="menu">
                                    <div className="user-dropdown-head">
                                        <div className="user-dropdown-name">{user.name}</div>
                                        {user.email && (
                                            <div className="user-dropdown-email">{user.email}</div>
                                        )}
                                    </div>
                                    <Link
                                        to="/my-bookings"
                                        className="user-dropdown-item"
                                        role="menuitem"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FiCalendar aria-hidden="true" /> My bookings
                                    </Link>
                                    <button
                                        type="button"
                                        className="user-dropdown-item user-dropdown-item--danger"
                                        role="menuitem"
                                        onClick={handleLogout}
                                    >
                                        <FiLogOut aria-hidden="true" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        className="nav-toggle"
                        aria-label={drawerOpen ? "Close menu" : "Open menu"}
                        aria-expanded={drawerOpen}
                        onClick={() => setDrawerOpen((v) => !v)}
                    >
                        {drawerOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
<<<<<<< HEAD
        </header>

        {drawerOpen && (
            <button
                type="button"
                className="drawer-scrim"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
            />
        )}

        <aside
            className={"drawer" + (drawerOpen ? " is-open" : "")}
            aria-hidden={!drawerOpen}
        >
            <div className="drawer-inner">
                {user ? (
                    <div className="drawer-user">
                        <span className="avatar avatar-lg" aria-hidden="true">{initials}</span>
                        <div>
                            <div className="drawer-user-name">{user.name}</div>
                            {user.email && (
                                <div className="drawer-user-sub">{user.email}</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="drawer-user">
                        <span className="avatar avatar-lg" aria-hidden="true">
                            <FiUser />
                        </span>
                        <div>
                            <div className="drawer-user-name">Welcome</div>
                            <div className="drawer-user-sub">Sign in to manage bookings</div>
                        </div>
                    </div>
                )}

                <div className="drawer-links">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            className="drawer-link"
                            href={`/#${item.id}`}
                            onClick={(e) => handleSectionClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    ))}
                    {user && (
                        <Link
                            to="/my-bookings"
                            className="drawer-link"
                            onClick={() => setDrawerOpen(false)}
                        >
                            <FiCalendar aria-hidden="true" /> My bookings
                        </Link>
                    )}
                </div>

                <div className="drawer-actions">
                    {!user ? (
                        <Link
                            to="/login"
                            className="btn btn-primary btn-block"
                            onClick={() => setDrawerOpen(false)}
                        >
                            Login or Sign up
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary btn-block"
                            onClick={handleLogout}
                        >
                            <FiLogOut aria-hidden="true" /> Logout
                        </button>
                    )}
                </div>
            </div>
        </aside>
        </>
=======

            {drawerOpen && (
                <button
                    type="button"
                    className="drawer-scrim"
                    aria-label="Close menu"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            <aside
                className={"drawer" + (drawerOpen ? " is-open" : "")}
                aria-hidden={!drawerOpen}
            >
                <div className="drawer-inner">
                    {user ? (
                        <div className="drawer-user">
                            <span className="avatar avatar-lg" aria-hidden="true">{initials}</span>
                            <div>
                                <div className="drawer-user-name">{user.name}</div>
                                {user.email && (
                                    <div className="drawer-user-sub">{user.email}</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="drawer-user">
                            <span className="avatar avatar-lg" aria-hidden="true">
                                <FiUser />
                            </span>
                            <div>
                                <div className="drawer-user-name">Welcome</div>
                                <div className="drawer-user-sub">Sign in to manage bookings</div>
                            </div>
                        </div>
                    )}

                    <div className="drawer-links">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                className="drawer-link"
                                href={`/#${item.id}`}
                                onClick={(e) => handleSectionClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                        ))}
                        {user && (
                            <Link
                                to="/my-bookings"
                                className="drawer-link"
                                onClick={() => setDrawerOpen(false)}
                            >
                                <FiCalendar aria-hidden="true" /> My bookings
                            </Link>
                        )}
                    </div>

                    <div className="drawer-actions">
                        {!user ? (
                            <Link
                                to="/login"
                                className="btn btn-primary btn-block"
                                onClick={() => setDrawerOpen(false)}
                            >
                                Login or Sign up
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary btn-block"
                                onClick={handleLogout}
                            >
                                <FiLogOut aria-hidden="true" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </header>
>>>>>>> a25c3281fe06ab6659c22ce42fd9a8d8bee68563
    );
}
