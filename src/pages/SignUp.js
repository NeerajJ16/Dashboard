import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../lib/config";
export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.detail || "Registration failed");
            alert("Registration successful! Please log in.");
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-900 text-white", children: _jsxs("form", { onSubmit: handleRegister, className: "bg-gray-800 p-8 rounded shadow-md w-full max-w-md", children: [_jsx("h2", { className: "text-2xl mb-4 font-bold", children: "Sign Up" }), error && _jsx("p", { className: "text-red-400 text-sm mb-2", children: error }), _jsx("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), className: "w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600", required: true }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600", required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600", required: true }), _jsx("button", { type: "submit", className: "w-full py-2 bg-green-600 hover:bg-green-700 rounded", children: "Create Account" }), _jsxs("p", { className: "text-sm mt-4 text-center", children: ["Already have an account? ", _jsx(Link, { to: "/", className: "text-blue-400 underline", children: "Sign in" })] })] }) }));
}
