import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button, Card, Col, Row, Spinner } from 'react-bootstrap';

import { toast } from 'react-toastify';
import {productSchema} from "../../validation/productSchema";
import axios from "axios";

// Mock data
const mockBrands = [
    { id: 'brand-1', name: 'Apple' },
    { id: 'brand-2', name: 'Samsung' },
    { id: 'brand-3', name: 'Sony' },
];
const mockSuppliers = [
    { id: 'supplier-1', name: 'Tech Distro Inc.' },
    { id: 'supplier-2', name: 'Global Gadgets Co.' },
    { id: 'supplier-3', name: 'Parts Unlimited' },
];
const unitMeasurements = ['cm', 'm', 'in', 'ft', 'kg', 'g', 'lb', 'oz'];
const countries = ['USA', 'China', 'Germany', 'Japan', 'Vietnam', 'Mexico', 'Other'];


export default function ProductForm({ product, onSubmit, isLoading = false }) {
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
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  resetForm,
              }) => (
                <FormikForm noValidate onSubmit={handleSubmit}>
                    <Row className="g-4">
                        {/* Product Details */}
                        <Col md={8}>
                            <Card className="shadow-sm">
                                <Card.Header>
                                    <Card.Title>Product Details</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name *</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.name && !!errors.name}
                                        />
                                        {/*<Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>*/}
                                    </Form.Group>
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Group controlId="sku">
                                                <Form.Label>SKU *</Form.Label>
                                                <Form.Control
                                                    name="sku"
                                                    type="text"
                                                    value={values.sku}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.sku && !!errors.sku}
                                                />
                                                {/*<Form.Control.Feedback type="invalid">
                                                    {errors.sku}
                                                </Form.Control.Feedback>*/}
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group controlId="price">
                                                <Form.Label>Price *</Form.Label>
                                                <Form.Control
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    value={values.price}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.price && !!errors.price}
                                                />
                                                {/*<Form.Control.Feedback type="invalid">
                                                    {errors.price}
                                                </Form.Control.Feedback>*/}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            {/* Inventory & Stock */}
                            <Card className="shadow-sm mt-4">
                                <Card.Header>
                                    <Card.Title>Inventory & Stock</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col sm={4}>
                                            <Form.Group controlId="available">
                                                <Form.Label>Available</Form.Label>
                                                <Form.Control
                                                    name="available"
                                                    type="number"
                                                    value={values.available}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Text>Quantity physically in stock.</Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Organization */}
                        <Col md={4}>
                            <Card className="shadow-sm">
                                <Card.Header>
                                    <Card.Title>Organization</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form.Group controlId="brandId">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Select
                                            name="brandId"
                                            value={values.brandId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.brandId && !!errors.brandId}
                                        >
                                            <option value="">Select brand...</option>
                                            {mockBrands.map((b) => (
                                                <option key={b.id} value={b.id}>
                                                    {b.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="supplierId" className="mt-3">
                                        <Form.Label>Supplier</Form.Label>
                                        <Form.Select
                                            name="supplierId"
                                            value={values.supplierId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.supplierId && !!errors.supplierId}
                                        >
                                            <option value="">Select supplier...</option>
                                            {mockSuppliers.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/* Dimensions & Weight */}
                    <Card className="shadow-sm mt-4">
                        <Card.Header>
                            <Card.Title>Dimensions & Weight</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form.Group controlId="length">
                                        <Form.Label>Length</Form.Label>
                                        <Form.Control
                                            name="length"
                                            type="number"
                                            step="0.1"
                                            value={values.length}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.length && !!errors.length}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="width">
                                        <Form.Label>Width</Form.Label>
                                        <Form.Control
                                            name="width"
                                            type="number"
                                            step="0.1"
                                            value={values.width}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.width && !!errors.width}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    {/* Images */}
                    <Card className="shadow-sm mt-4">
                        <Card.Header>
                            <Card.Title>Images</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="productImages">
                                <Form.Label>Upload Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const files = Array.from(e.target.files || []);
                                        const dataUrls = await Promise.all(
                                            files.map((file) =>
                                                new Promise((res, rej) => {
                                                    const reader = new FileReader();
                                                    reader.onload = () => res(reader.result);
                                                    reader.onerror = rej;
                                                    reader.readAsDataURL(file);
                                                })
                                            )
                                        );
                                        setFieldValue('productImages', [...values.productImages, ...dataUrls]);
                                        e.target.value = '';
                                    }}
                                />
                                <Form.Text muted>Upload multiple images of the product.</Form.Text>
                            </Form.Group>
                            {values.productImages.length > 0 && (
                                <Row className="mt-3 g-2">
                                    {values.productImages.map((src, idx) => (
                                        <Col key={idx} xs={6} sm={4} md={3} lg={2} className="position-relative">
                                            <img
                                                src={src}
                                                alt={`Product Image ${idx + 1}`}
                                                className="img-fluid rounded"
                                                style={{ objectFit: 'cover', height: '100px', width: '100%' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-1 p-1"
                                                onClick={() => {
                                                    const updated = values.productImages.filter((_, i) => i !== idx);
                                                    setFieldValue('productImages', updated);
                                                }}
                                            >
                                                ×
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                    {/* Footer Buttons */}
                    <div className="text-end mt-4">
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                resetForm();
                            }}
                            disabled={isSubmitting}
                            className="me-2"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation="border" size="sm" className="me-1" /> : product ? 'Update Product' : 'Create Product'}
                            {isSubmitting && ' Saving...'}
                        </Button>
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
}
