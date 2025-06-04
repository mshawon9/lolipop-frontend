import React, {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import {toast} from "react-toastify";
import {dateValidationSchema} from "../validation/validationSchema"
import {Link} from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10); // Default to 10 products per page
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState("createdAt");
    const [sortDir, setSortDir] = useState("desc");
    const [nameFilter, setNameFilter] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateAndFetch();
    }, [pageNo, pageSize, sortField, sortDir, nameFilter, fromDate, toDate]);

    const validateAndFetch = async () => {
        const validationData = {fromDate, toDate};

        try {
            await dateValidationSchema.validate(validationData, {abortEarly: false});
            setErrors({});
            fetchProducts();
        } catch (err) {
            const errorObj = {};
            err.inner.forEach((e) => {
                errorObj[e.path] = e.message;
            });
            setErrors(errorObj);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/products", {
                params: {
                    pageNo,
                    pageSize,
                    sortField,
                    sortDir,
                    name: nameFilter || null,
                    from: fromDate ? format(fromDate, "yyyy-MM-dd") : null,
                    to: toDate ? format(toDate, "yyyy-MM-dd") : null,
                },
            });

            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

    const formattedDate = (dateString) => {
        return format(new Date(dateString), "dd/MM/yy HH:mm");
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Validation</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/product-form"
                                  className="btn btn-primary w-25 float-right">
                                Add new Product
                            </Link>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid*/}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Product List</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">

                                    {/* 🔍 Search & Filters */}
                                    <div className="d-flex flex-wrap justify-content-between mb-3">

                                        {/* Search by Name */}
                                        <div className="input-group w-25">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by name..."
                                                value={nameFilter}
                                                onChange={(e) => setNameFilter(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                          <span className="input-group-text">
                                            <i className="fas fa-search"></i>
                                          </span>
                                            </div>
                                        </div>

                                        {/* Date Pickers */}
                                        <div className="w-25">
                                            <DatePicker
                                                className="form-control"
                                                selected={fromDate}
                                                onChange={(date) => setFromDate(date)}
                                                dateFormat="dd-MM-yyyy"
                                                placeholderText="From Date"
                                            />
                                            {errors.fromDate && <div className="text-danger">{errors.fromDate}</div>}
                                        </div>
                                        <DatePicker
                                            className="form-control"
                                            selected={toDate}
                                            onChange={(date) => setToDate(date)}
                                            dateFormat="dd-MM-yyyy"
                                            placeholderText="To Date"
                                        />

                                        {/* Page Size Dropdown */}
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    data-toggle="dropdown">
                                                Page Size: {pageSize}
                                            </button>
                                            <div className="dropdown-menu">
                                                {[5, 10, 25, 50].map((size) => (
                                                    <button key={size} className="dropdown-item"
                                                            onClick={() => setPageSize(size)}>
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sort Options */}
                                        <select className="form-control w-25" value={sortField}
                                                onChange={(e) => setSortField(e.target.value)}>
                                            <option value="createdAt">Created At</option>
                                            <option value="name">Name</option>
                                            <option value="sku">SKU</option>
                                        </select>
                                        <select className="form-control w-25" value={sortDir}
                                                onChange={(e) => setSortDir(e.target.value)}>
                                            <option value="asc">Ascending</option>
                                            <option value="desc">Descending</option>
                                        </select>
                                    </div>

                                    {/* 📦 Product Table */}
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary"></div>
                                        </div>
                                    ) : (
                                        <table className="table table-bordered">
                                            <thead className="thead-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>SKU</th>
                                                <th>Name</th>
                                                <th>Created At</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {products.length > 0 ? (
                                                products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.sku}</td>
                                                        <td>{product.name}</td>
                                                        <td>{formattedDate(product.created_at)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No products found.</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* ⏭️ Pagination */}
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-primary" disabled={pageNo === 0}
                                                onClick={() => setPageNo(pageNo - 1)}>
                                            Previous
                                        </button>
                                        <span>Page {pageNo + 1} of {totalPages}</span>
                                        <button className="btn btn-primary" disabled={pageNo + 1 >= totalPages}
                                                onClick={() => setPageNo(pageNo + 1)}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
        ;
};

export default ProductList;
