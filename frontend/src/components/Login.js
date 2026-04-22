import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiCheckCircle,
    FiEye,
    FiEyeOff,
    FiLogIn,
    FiUserPlus,
} from "react-icons/fi";

import { api } from "../data/api";
import "./Login.css";

const initialLogin = { email: "", password: "" };
const initialSignup = { name: "", email: "", phoneno: "", password: "" };

const passwordIsStrong = (p) =>
    typeof p === "string" && p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [mode, setMode] = useState("login"); // 'login' | 'signup'
    const [login, setLogin] = useState(initialLogin);
    const [signup, setSignup] = useState(initialSignup);
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [info, setInfo] = useState("");

    const isLogin = mode === "login";

    const onLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin((p) => ({ ...p, [name]: value }));
    };

    const onSignupChange = (e) => {
        const { name, value } = e.target;
        setSignup((p) => ({ ...p, [name]: value }));
    };

    const validate = () => {
        if (isLogin) {
            if (!/^\S+@\S+\.\S+$/.test(login.email)) return "Enter a valid email.";
            if (!login.password) return "Password is required.";
            return "";
        }
        if (!signup.name.trim() || signup.name.trim().length < 2)
            return "Please enter your full name.";
        if (!/^\S+@\S+\.\S+$/.test(signup.email)) return "Enter a valid email.";
        if (!/^[6-9]\d{9}$/.test(signup.phoneno))
            return "Enter a valid 10-digit Indian mobile number.";
        if (!passwordIsStrong(signup.password))
            return "Password must be at least 8 characters and include both letters and numbers.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setInfo("");
        const validationError = validate();
        if (validationError) {
            setServerError(validationError);
            return;
        }

        setSubmitting(true);
        try {
            if (isLogin) {
                const res = await api.post("/api/users/login", login);
                if (!res || !res.token) throw new Error("Unexpected server response.");
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user || {}));
                window.dispatchEvent(new CustomEvent("homehelper-auth-change"));
                const redirectTo = location.state?.from || "/";
                navigate(redirectTo);
            } else {
                await api.post("/api/users/register", signup);
                setInfo("Account created. You can log in now.");
                setMode("login");
                setLogin({ email: signup.email, password: "" });
                setSignup(initialSignup);
            }
        } catch (err) {
            setServerError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-shell container">
                <section className="auth-pitch" aria-hidden="true">
                    <span className="auth-eyebrow">HomeHelper</span>
                    <h1 className="auth-pitch-title">
                        Trusted home services, <br /> just one tap away.
                    </h1>
                    <p className="auth-pitch-lede">
                        Verified professionals, transparent pricing and real human support —
                        for cleaning, cooking, caretaking and more.
                    </p>
                    <ul className="auth-pitch-list">
                        <li>
                            <FiCheckCircle aria-hidden="true" /> Background-verified pros
                        </li>
                        <li>
                            <FiCheckCircle aria-hidden="true" /> Reschedule any time before the visit
                        </li>
                        <li>
                            <FiCheckCircle aria-hidden="true" /> Re-do guarantee on every standard service
                        </li>
                    </ul>
                </section>

                <section className="auth-card card-elevated">
                    <div className="auth-toggle" role="tablist" aria-label="Account mode">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={isLogin}
                            className={"auth-toggle-btn" + (isLogin ? " is-active" : "")}
                            onClick={() => {
                                setMode("login");
                                setServerError("");
                                setInfo("");
                            }}
                        >
                            <FiLogIn aria-hidden="true" /> Login
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={!isLogin}
                            className={"auth-toggle-btn" + (!isLogin ? " is-active" : "")}
                            onClick={() => {
                                setMode("signup");
                                setServerError("");
                                setInfo("");
                            }}
                        >
                            <FiUserPlus aria-hidden="true" /> Sign up
                        </button>
                    </div>

                    <h2 className="auth-title">
                        {isLogin ? "Welcome back" : "Create your account"}
                    </h2>
                    <p className="auth-sub">
                        {isLogin
                            ? "Log in to manage your bookings."
                            : "Sign up to book and track services."}
                    </p>

                    {serverError && (
                        <div className="banner banner-error" role="alert">
                            {serverError}
                        </div>
                    )}
                    {info && (
                        <div className="banner banner-success" role="status">
                            {info}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {!isLogin && (
                            <div className="field">
                                <label className="label" htmlFor="auth-name">Full name</label>
                                <input
                                    id="auth-name"
                                    className="input"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={signup.name}
                                    onChange={onSignupChange}
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>
                        )}

                        <div className="field">
                            <label className="label" htmlFor="auth-email">Email</label>
                            <input
                                id="auth-email"
                                className="input"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={isLogin ? login.email : signup.email}
                                onChange={isLogin ? onLoginChange : onSignupChange}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="field">
                                <label className="label" htmlFor="auth-phone">Phone</label>
                                <input
                                    id="auth-phone"
                                    className="input"
                                    name="phoneno"
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    value={signup.phoneno}
                                    onChange={onSignupChange}
                                    placeholder="10-digit mobile"
                                    required
                                />
                            </div>
                        )}

                        <div className="field">
                            <label className="label" htmlFor="auth-pwd">Password</label>
                            <div className="auth-pwd-wrap">
                                <input
                                    id="auth-pwd"
                                    className="input"
                                    name="password"
                                    type={showPwd ? "text" : "password"}
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    value={isLogin ? login.password : signup.password}
                                    onChange={isLogin ? onLoginChange : onSignupChange}
                                    placeholder={isLogin ? "Your password" : "Min 8 chars, letters + numbers"}
                                    required
                                />
                                <button
                                    type="button"
                                    className="auth-pwd-toggle"
                                    onClick={() => setShowPwd((v) => !v)}
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                >
                                    {showPwd ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="spinner" aria-hidden="true" />
                                    {isLogin ? "Logging in…" : "Creating account…"}
                                </>
                            ) : (
                                <>
                                    {isLogin ? "Login" : "Create account"}{" "}
                                    <FiArrowRight aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="auth-switch">
                        {isLogin ? (
                            <>
                                New here?{" "}
                                <button
                                    type="button"
                                    className="auth-link"
                                    onClick={() => {
                                        setMode("signup");
                                        setServerError("");
                                        setInfo("");
                                    }}
                                >
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="auth-link"
                                    onClick={() => {
                                        setMode("login");
                                        setServerError("");
                                        setInfo("");
                                    }}
                                >
                                    Log in
                                </button>
                            </>
                        )}
                    </p>

                    <p className="auth-back">
                        <Link to="/">← Back to home</Link>
                    </p>
                </section>
            </div>
        </div>
    );
}
