import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import RoadmapDetail from "./pages/RoadmapDetail";
import CreateRoadmap from "./pages/CreateRoadmap";
export default function App() {
    const token = localStorage.getItem("token");
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: token ? _jsx(Navigate, { to: "/dashboard" }) : _jsx(SignIn, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/dashboard", element: localStorage.getItem("token") ? _jsx(Dashboard, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/roadmap/:id", element: token ? _jsx(RoadmapDetail, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/create", element: token ? _jsx(CreateRoadmap, {}) : _jsx(Navigate, { to: "/" }) })] }) }));
}
