import React from 'react';
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
            </ul>
            <Outlet />
        </>
    )
}
