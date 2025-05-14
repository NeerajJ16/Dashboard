import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../lib/config";
function toTitleCase(str) {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
export default function Dashboard() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
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
                console.error("Failed to fetch roadmaps:", err);
                setRoadmaps([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);
    return (_jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "w-full bg-black min-h-screen text-white px-4 py-6 sm:px-6 md:ml-72", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Your Learnings," }), loading ? (_jsx("p", { className: "text-gray-400", children: "Loading..." })) : roadmaps.length === 0 ? (_jsx("p", { className: "text-gray-400", children: "No roadmaps found." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: roadmaps.map((rm) => (_jsxs(Link, { to: `/roadmap/${rm.id}`, className: "border border-gray-700 rounded-lg p-4 shadow hover:shadow-lg hover:bg-gray-800 transition-all", children: [_jsx("h2", { className: "text-lg font-semibold text-blue-400 mb-2", children: toTitleCase(rm.learning_goals) }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Created: ", new Date(rm.created_at).toLocaleDateString()] })] }, rm.id))) }))] })] }));
}
