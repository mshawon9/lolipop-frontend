// ProductFormPage.jsx
import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {productSchema} from '../validation/productSchema';
import axios from "axios";
import {toast} from "react-toastify";
import Breadcrumb from "../components/Breadcrumb";

const ProductFormPage = ({product, onSubmit, isLoading = false}) => {
    const initialValues = {
        name: product?.name || '',
        description: product?.description || '',
        shortName: product?.shortName || '',
        sku: product?.sku || '',
        barcode: product?.barcode || '',
        brandId: product?.brandId || '',
        supplierId: product?.supplierId || '',
        price: product?.price || '',
        available: product?.available !== undefined ? product.available : 0,
        allocated: product?.allocated !== undefined ? product.allocated : 0,
        onHand: product?.onHand !== undefined ? product.onHand : 0,
        manufacturer: product?.manufacturer || '',
        manufacturePartNumber: product?.manufacturePartNumber || '',
        oemPartNumber: product?.oemPartNumber || '',
        length: product?.length || '',
        width: product?.width || '',
        height: product?.height || '',
        weight: product?.weight || '',
        countryOfOrigin: product?.countryOfOrigin || '',
        unitMeasurementInHeight: product?.unitMeasurementInHeight || '',
        unitMeasurementInWeight: product?.unitMeasurementInWeight || '',
        productImages: Array.isArray(product?.productImages) ? product.productImages : [],
    };

    const handleSubmit = async (values, {setErrors, setSubmitting, resetForm}) => {
        try {
            // Show loading toast
            toast.info("Submitting product...", {autoClose: 2000});

            // Simulate API call delay (for better UX)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const response = await axios.post("http://localhost:8080/products/add", values, {
                headers: {"Content-Type": "application/json"},
            });

            toast.success("Product added successfully!");
            console.log("Response:", response.data);
            resetForm();
        } catch (error) {
            console.error("API Error:", error);

            if (error.response && error.response.data) {
                const apiError = error.response.data;

                // Set validation errors if subErrors exist
                if (apiError.apierror.subErrors && apiError.apierror.subErrors.length > 0) {
                    const fieldErrors = {};
                    apiError.apierror.subErrors.forEach((subError) => {
                        fieldErrors[subError.field] = subError.message;
                    });

                    console.error(fieldErrors);
                    // Set Formik errors
                    setErrors(fieldErrors);
                }

                // Show error message in toast
                toast.error(apiError.apierror.message || "An error occurred!");
            } else {
                toast.error("Server error! Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Content Header (Page header) */}
            <Breadcrumb
                title="Add Product"
                links={[
                    {label: "Home", path: "/", icon: "fas fa-home"},
                    {label: "Products", path: "/products", icon: "fas fa-boxes"},
                    {label: "Add Product", active: true, icon: "fas fa-plus-circle"},
                ]}
            />

            {/* Main content */
            }
            <section className="content">
                <div className="container-fluid">

                    {toast.dismiss()}

                    {/* Formik Setup */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={productSchema}
                        onSubmit={handleSubmit}
                    >
                        {({values, setFieldValue, isSubmitting}) => (
                            <Form>
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="card shadow-sm">
                                            <div className="card-header">
                                                <h3 className="card-title">Basic Information</h3>
                                            </div>
                                            <div className="card-body">
                                                {/* Name */}
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">Name
                                                        <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field
                                                            id="name"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Enter product name"
                                                        />
                                                    </div>
                                                    {/* Error message if validation fails */}
                                                    <div className="col-sm-3">
                                                        <ErrorMessage
                                                            name="name"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Short Name */}
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-3 col-form-label">Short
                                                        Name</label>
                                                    <div className="col-sm-6">
                                                        <Field
                                                            id="shortName"
                                                            name="shortName"
                                                            className="form-control form-control-border"
                                                            placeholder="Enter Short name"
                                                        />
                                                    </div>
                                                    {/* Error message if validation fails */}
                                                    <div className="col-sm-3">
                                                        <ErrorMessage
                                                            name="shortName"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>

                                                {/* SKU */}
                                                <div className="form-group row">
                                                    <label htmlFor="sku"
                                                           className="col-sm-3 col-form-label">SKU</label>
                                                    <div className="col-sm-6">
                                                        <Field
                                                            id="sku"
                                                            name="sku"
                                                            className="form-control form-control-border"
                                                            placeholder="Enter SKU"
                                                        />
                                                    </div>
                                                    {/* Error message if validation fails */}
                                                    <div className="col-sm-3">
                                                        <ErrorMessage
                                                            name="sku"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="form-group row">
                                                    <label htmlFor="description"
                                                           className="col-sm-3 col-form-label">Description</label>
                                                    <div className="col-sm-6">
                                                        <Field
                                                            id="description"
                                                            name="description"
                                                            className="form-control form-control-border"
                                                            placeholder="Enter description"
                                                        />
                                                    </div>
                                                    {/* Error message if validation fails */}
                                                    <div className="col-sm-3">
                                                        <ErrorMessage
                                                            name="description"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>

                                                {/* barcode */}
                                                <div className="form-group row">
                                                    <label htmlFor="barcode"
                                                           className="col-sm-3 col-form-label">barcode</label>
                                                    <div className="col-sm-6">
                                                        <Field
                                                            id="barcode"
                                                            name="barcode"
                                                            className="form-control form-control-border"
                                                            placeholder="Enter barcode"
                                                        />
                                                    </div>
                                                    {/* Error message if validation fails */}
                                                    <div className="col-sm-3">
                                                        <ErrorMessage
                                                            name="barcode"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className="col-lg-12">
                                        <div className="card shadow-sm">
                                            <div className="card-header">
                                                <h3 className="card-title">Product Images</h3>
                                            </div>
                                            <div className="card-body">
                                                {/* Name */}
                                                <div className="input-group">
                                                    <div className="custom-file">

                                                        <input
                                                            className="custom-file-input"
                                                            id="productImages"
                                                            name="productImages"
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                const files = Array.from(e.target.files || []);
                                                                const dataUrls = await Promise.all(
                                                                    files.map(
                                                                        (file) =>
                                                                            new Promise((res, rej) => {
                                                                                const reader = new FileReader();
                                                                                reader.onload = () => res(reader.result);
                                                                                reader.onerror = rej;
                                                                                reader.readAsDataURL(file);
                                                                            })
                                                                    )
                                                                );
                                                                const updated = [...values.productImages, ...dataUrls];
                                                                setFieldValue('productImages', updated);
                                                                e.target.value = '';
                                                            }}
                                                        />
                                                        <label className="custom-file-label" htmlFor="productImages">Choose
                                                            file</label>
                                                    </div>

                                                </div>

                                                {values.productImages.length > 0 && (
                                                    <div className="image-previews">
                                                        {values.productImages.map((src, idx) => (
                                                            <div key={idx} style={{
                                                                display: 'inline-block',
                                                                position: 'relative',
                                                                margin: 8
                                                            }}>
                                                                <img
                                                                    src={src}
                                                                    alt={`Preview ${idx + 1}`}
                                                                    style={{
                                                                        width: 100,
                                                                        height: 100,
                                                                        objectFit: 'cover',
                                                                        borderRadius: 4
                                                                    }}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const filtered = values.productImages.filter((_, i) => i !== idx);
                                                                        setFieldValue('productImages', filtered);
                                                                    }}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 2,
                                                                        right: 2,
                                                                        background: 'rgba(0,0,0,0.5)',
                                                                        color: '#fff',
                                                                        border: 'none',
                                                                        borderRadius: '50%',
                                                                        width: 24,
                                                                        height: 24,
                                                                        cursor: 'pointer',
                                                                    }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Name */}
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Name
                                            <span style={{color: "red"}}>*</span>
                                        </label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="name"
                                                name="name"
                                                className="form-control form-control-border"
                                                placeholder="Enter product name"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* Short Name */}
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Short
                                            Name</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="shortName"
                                                name="shortName"
                                                className="form-control form-control-border"
                                                placeholder="Enter Short name"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="shortName"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* SKU */}
                                    <div className="form-group row">
                                        <label htmlFor="sku" className="col-sm-3 col-form-label">SKU</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="sku"
                                                name="sku"
                                                className="form-control form-control-border"
                                                placeholder="Enter SKU"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="sku"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="form-group row">
                                        <label htmlFor="description"
                                               className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="description"
                                                name="description"
                                                className="form-control form-control-border"
                                                placeholder="Enter description"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="description"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* barcode */}
                                    <div className="form-group row">
                                        <label htmlFor="barcode"
                                               className="col-sm-3 col-form-label">barcode</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="barcode"
                                                name="barcode"
                                                className="form-control form-control-border"
                                                placeholder="Enter barcode"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="barcode"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* manufacturer */}
                                    <div className="form-group row">
                                        <label htmlFor="manufacturer"
                                               className="col-sm-3 col-form-label">manufacturer</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="manufacturer"
                                                name="manufacturer"
                                                className="form-control form-control-border"
                                                placeholder="Enter manufacturer"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="manufacturer"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* brandId */}
                                    <div className="form-group row">
                                        <label htmlFor="brandId" className="col-sm-3 col-form-label">brandId</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="brandId"
                                                name="brandId"
                                                className="form-control form-control-border"
                                                placeholder="Enter brandId"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="brandId"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* supplierId */}
                                    <div className="form-group row">
                                        <label htmlFor="supplierId"
                                               className="col-sm-3 col-form-label">supplierId</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="supplierId"
                                                name="supplierId"
                                                className="form-control form-control-border"
                                                placeholder="Enter supplierId"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="supplierId"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* countryOfOrigin */}
                                    <div className="form-group row">
                                        <label htmlFor="countryOfOrigin"
                                               className="col-sm-3 col-form-label">countryOfOrigin</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="countryOfOrigin"
                                                name="countryOfOrigin"
                                                className="form-control form-control-border"
                                                placeholder="Enter countryOfOrigin"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="countryOfOrigin"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="form-group row">
                                        <label htmlFor="price"
                                               className="col-sm-3 col-form-label text-capitalize">price</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="price"
                                                name="price"
                                                className="form-control form-control-border"
                                                placeholder="Enter price"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="price"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>


                                    {/* manufacturePartNumber */}
                                    <div className="form-group row">
                                        <label htmlFor="manufacturePartNumber"
                                               className="col-sm-3 col-form-label text-capitalize">manufacturePartNumber</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="manufacturePartNumber"
                                                name="manufacturePartNumber"
                                                className="form-control form-control-border"
                                                placeholder="Enter manufacturePartNumber"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="manufacturePartNumber"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* oemPartNumber */}
                                    <div className="form-group row">
                                        <label htmlFor="oemPartNumber"
                                               className="col-sm-3 col-form-label text-capitalize">oemPartNumber</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="oemPartNumber"
                                                name="oemPartNumber"
                                                className="form-control form-control-border"
                                                placeholder="Enter oemPartNumber"
                                            />
                                        </div>
                                        {/* Error message if validation fails */}
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="oemPartNumber"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* length */}
                                    <div className="form-group row">
                                        <label htmlFor="length"
                                               className="col-sm-3 col-form-label text-capitalize">length</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="length"
                                                name="length"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter length"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="length"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* height */}
                                    <div className="form-group row">
                                        <label htmlFor="height"
                                               className="col-sm-3 col-form-label text-capitalize">height</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="height"
                                                name="height"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter height"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="height"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* width */}
                                    <div className="form-group row">
                                        <label htmlFor="width"
                                               className="col-sm-3 col-form-label text-capitalize">width</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="width"
                                                name="width"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter width"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="width"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* weight */}
                                    <div className="form-group row">
                                        <label htmlFor="weight"
                                               className="col-sm-3 col-form-label text-capitalize">weight</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="weight"
                                                name="weight"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter weight"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="weight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* onHand */}
                                    <div className="form-group row">
                                        <label htmlFor="onHand"
                                               className="col-sm-3 col-form-label text-capitalize">onHand</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="onHand"
                                                name="onHand"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter onHand"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="onHand"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* allocated */}
                                    <div className="form-group row">
                                        <label htmlFor="allocated"
                                               className="col-sm-3 col-form-label text-capitalize">allocated</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="allocated"
                                                name="allocated"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter allocated"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="allocated"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* available */}
                                    <div className="form-group row">
                                        <label htmlFor="available"
                                               className="col-sm-3 col-form-label text-capitalize">available</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="available"
                                                name="available"
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter available"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="available"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* unitMeasurementInHeight */}
                                    <div className="form-group row">
                                        <label htmlFor="unitMeasurementInHeight"
                                               className="col-sm-3 col-form-label text-capitalize">unitMeasurementInHeight</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="unitMeasurementInHeight"
                                                name="unitMeasurementInHeight"
                                                className="form-control"
                                                placeholder="Enter unitMeasurementInHeight"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="unitMeasurementInHeight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* unitMeasurementInWeight */}
                                    <div className="form-group row">
                                        <label htmlFor="unitMeasurementInWeight"
                                               className="col-sm-3 col-form-label text-capitalize">unitMeasurementInWeight</label>
                                        <div className="col-sm-6">
                                            <Field
                                                id="unitMeasurementInWeight"
                                                name="unitMeasurementInWeight"
                                                className="form-control"
                                                placeholder="Enter unitMeasurementInWeight"
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <ErrorMessage
                                                name="unitMeasurementInWeight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-body */}

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary float-right w-25"
                                            disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm mr-2"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                    &nbsp;
                                    <button type="reset" className="btn btn-secondary">
                                        Reset
                                    </button>
                                    &nbsp;
                                    <button type="reset" className="btn btn-info">
                                        Product List
                                    </button>
                                </div>
                            </Form>
                        )}

                    </Formik>
                    {/* /.Formik container */}
                </div>
            </section>
        </>
    )

};

export default ProductFormPage;
