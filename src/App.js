import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Layout from "./components/globals/Layout";
import Header from './components/globals/Header';
import Footer from './components/globals/Footer';
import PageNotFound from './components/PageNotFound';
import TrackDetail from './components/card/TrackDetail';

function App() {
    return (
        <div className="app">

            <Header />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="tracks/:id" element={<TrackDetail />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    )
}

export default App;