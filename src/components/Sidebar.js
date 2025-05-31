import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/config";
const buttonStyle = {
    backgroundColor: "#18cb96",
    color: "#ffffff",
};
export default function Sidebar() {
    const navigate = useNavigate();
    const [roadmaps, setRoadmaps] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const token = localStorage.getItem("token");
                 const res = await fetch(`${API_BASE_URL}/api/user/roadmaps`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setRoadmaps(data.roadmaps || []);
            }
            catch (err) {
                console.error("Failed to fetch roadmaps");
            }
        };
        fetchRoadmaps();
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "md:hidden fixed top-4 right-4 z-50 text-white focus:outline-none", onClick: () => setIsOpen(!isOpen), children: _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "block w-6 h-0.5 bg-white" }), _jsx("span", { className: "block w-6 h-0.5 bg-white" }), _jsx("span", { className: "block w-6 h-0.5 bg-white" })] }) }), _jsxs("div", { className: `fixed top-0 left-0 z-40 h-screen w-72 bg-gray-950 text-white flex flex-col justify-between border-r border-gray-800 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`, children: [_jsxs("div", { className: "flex flex-col h-full", children: [_jsx("div", { className: "p-4 flex items-center justify-center border-b border-gray-800", children: _jsx("img", { src: "/logo-2.svg", alt: "LearnScape Logo", className: "h-24 w-auto" }) }), _jsxs("div", { className: "p-4 space-y-2", children: [_jsx(Link, { to: "/dashboard", className: "block px-4 py-2 rounded text-center hover:brightness-90 transition", style: buttonStyle, onClick: () => setIsOpen(false), children: "\uD83C\uDFE0 Dashboard" }), _jsx(Link, { to: "/create", className: "block px-4 py-2 rounded text-center hover:brightness-90 transition", style: buttonStyle, onClick: () => setIsOpen(false), children: "\u2795 Create New Roadmap" })] }), _jsxs("div", { className: "px-4 mt-4 overflow-y-auto flex-1", children: [_jsx("h2", { className: "text-xs uppercase text-gray-500 mb-2", children: "Saved Roadmaps" }), _jsx("div", { className: "space-y-1 pb-6", children: roadmaps.map((rm) => (_jsx(Link, { to: `/roadmap/${rm.id}`, className: "block px-4 py-2 text-sm hover:bg-gray-800 rounded", onClick: () => setIsOpen(false), children: rm.learning_goals }, rm.id))) })] })] }), _jsxs("div", { className: "p-4 border-t border-gray-800 space-y-2", children: [_jsx("button", { onClick: handleLogout, className: "w-full px-4 py-2 rounded text-center hover:brightness-90 transition", style: buttonStyle, children: "\uD83D\uDD13 Logout" }), _jsx("a", { href: "https://www.learnscapeai.com", target: "_blank", rel: "noopener noreferrer", className: "block text-sm text-gray-400 hover:text-white text-center", children: "\uD83C\uDF10 Main Site" })] })] })] }));
}
