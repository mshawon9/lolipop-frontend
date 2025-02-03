import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductFormPage from "./pages/ProductFormPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./pages/ProductList";

function App() {

    return (
        <BrowserRouter>
            <ToastContainer position="top-right" autoClose={3000}/>
            <Header/>
            <Sidebar/>
            <div className="content-wrapper">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/product-form" element={<ProductFormPage/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;
