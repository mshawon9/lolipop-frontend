import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ title, links }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading effect
        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    {/* Page Title */}
                    <div className="col-sm-6">
                        <h1> {title}</h1>
                    </div>

                    {/* Breadcrumb Navigation */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`breadcrumb-item ${link.active ? "active" : ""}`}
                                >
                                    {loading ? (
                                        <span className="spinner-grow spinner-grow-sm text-secondary"></span>
                                    ) : link.path ? (
                                        <Link to={link.path}>
                                            {link.icon && <i className={`mr-1 ${link.icon}`}></i>}
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <>
                                            {link.icon && <i className={`mr-1 ${link.icon}`}></i>}
                                            {link.label}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;
