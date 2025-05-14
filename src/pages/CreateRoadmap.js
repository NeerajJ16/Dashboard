import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../lib/config";
const buttonStyle = {
    backgroundColor: "#18cb96",
    color: "#ffffff",
};
export default function CreateRoadmap() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        learning_goals: "",
        months: undefined,
        days_per_week: undefined,
        hours_per_day: undefined,
    });
    const [creating, setCreating] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        const { learning_goals, months, days_per_week, hours_per_day } = formData;
        if (!learning_goals || !months || !days_per_week || !hours_per_day) {
            alert("Please fill out all fields.");
            setCreating(false);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/generate_roadmap_stream`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok)
                throw new Error("Failed to create roadmap");
            const data = await res.json();
            console.log("Created roadmap:", data);
            // Delay redirect slightly for UX (optional)
            setTimeout(() => navigate("/dashboard"), 1000);
        }
        catch (err) {
            alert("Error creating roadmap.");
            console.error(err);
            setCreating(false);
        }
    };
    return (_jsxs("div", { className: "flex", children: [_jsx(Sidebar, {}), _jsx("main", { className: "w-full md:ml-72 flex items-center justify-center min-h-screen bg-black text-white px-4 sm:px-6", children: creating ? (_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Creating your roadmap... Do not refresh your page." }), _jsx("p", { className: "text-gray-400", children: "Please wait while we generate your personalized plan." })] })) : (_jsxs("div", { className: "w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 sm:p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "Create New Roadmap" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-1", children: "Topic You Want to Learn" }), _jsx("input", { type: "text", required: true, className: "w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white", value: formData.learning_goals, onChange: (e) => setFormData({ ...formData, learning_goals: e.target.value }) })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("label", { className: "block text-sm mb-1", children: "Months" }), _jsx("input", { type: "number", required: true, min: 1, value: formData.months || "", onChange: (e) => setFormData({ ...formData, months: Number(e.target.value) }), className: "w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" })] }), _jsxs("div", { className: "w-full", children: [_jsx("label", { className: "block text-sm mb-1", children: "Days/Week" }), _jsx("input", { type: "number", required: true, min: 1, max: 7, value: formData.days_per_week || "", onChange: (e) => setFormData({ ...formData, days_per_week: Number(e.target.value) }), className: "w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" })] }), _jsxs("div", { className: "w-full", children: [_jsx("label", { className: "block text-sm mb-1", children: "Hours/Day" }), _jsx("input", { type: "number", required: true, min: 1, max: 12, value: formData.hours_per_day || "", onChange: (e) => setFormData({ ...formData, hours_per_day: Number(e.target.value) }), className: "w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" })] })] }), _jsx("button", { type: "submit", className: "w-full px-4 py-2 rounded hover:brightness-90 transition font-medium text-lg", style: buttonStyle, children: "Create Roadmap" })] })] })) })] }));
}
