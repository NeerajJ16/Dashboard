import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
function toTitleCase(str) {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
export default function RoadmapDetail() {
    const { id } = useParams();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://44.201.125.113:8000/api/user/roadmaps/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setRoadmap(data);
            }
            catch (err) {
                console.error("Failed to load roadmap:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [id]);
    if (loading) {
        return _jsx("div", { className: "text-white p-6 md:ml-72", children: "Loading roadmap..." });
    }
    if (!roadmap) {
        return _jsx("div", { className: "text-white p-6 md:ml-72", children: "Roadmap not found." });
    }
    return (_jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "w-full md:ml-72 px-4 sm:px-6 py-6 bg-black min-h-screen text-white", children: [_jsxs("div", { className: "bg-gray-900 border border-gray-700 rounded-lg p-6 shadow mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: toTitleCase(roadmap.learning_goals) }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Duration: ", roadmap.months, " month(s), ", roadmap.days_per_week, " days/week, ", roadmap.hours_per_day, " hrs/day"] }), _jsxs("p", { className: "text-sm text-green-400 mt-1", children: [roadmap.content?.message, " | Progress: ", roadmap.content?.progress?.percent_complete, "%"] })] }), Object.entries(roadmap.content.roadmap).map(([weekKey, days]) => (_jsxs("details", { className: "bg-gray-900 border border-gray-700 rounded-lg mb-4 shadow", children: [_jsx("summary", { className: "cursor-pointer select-none text-lg font-semibold px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-t", children: weekKey.toUpperCase() }), _jsx("div", { className: "px-4 sm:px-6 py-5 space-y-6", children: Object.entries(days).map(([dayKey, items]) => (_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold mb-3 text-teal-400 uppercase tracking-wide", children: dayKey }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: items.map((item, idx) => {
                                                const parts = item.resource.split(" - ");
                                                const url = parts[1] || "#";
                                                return (_jsxs("div", { className: "bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all", children: [_jsxs("h4", { className: "text-sm font-semibold text-white mb-2", children: [idx + 1, ". ", item.topic] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-[#18cb96] underline hover:brightness-110", children: "Start Learning \u2192" }), _jsxs("span", { className: "text-xs bg-gray-700 text-white px-2 py-1 rounded", children: [item.hours, " hrs"] })] })] }, idx));
                                            }) })] }, dayKey))) })] }, weekKey)))] })] }));
}
