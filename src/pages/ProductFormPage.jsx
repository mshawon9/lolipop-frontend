import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Form, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../components/Breadcrumb';
import { productSchema } from '../validation/productSchema';

// Mock options - would normally come from an API
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

const ProductFormPage = () => {
  const initialValues = {
    name: '',
    description: '',
    shortName: '',
    sku: '',
    barcode: '',
    brandId: '',
    supplierId: '',
    price: '',
    available: 0,
    allocated: 0,
    onHand: 0,
    manufacturer: '',
    manufacturePartNumber: '',
    oemPartNumber: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    countryOfOrigin: '',
    unitMeasurementInHeight: '',
    unitMeasurementInWeight: '',
    productImages: [],
  };

  const handleSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      toast.info('Submitting product...', { autoClose: 2000 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post('http://localhost:8080/products/add', values, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Product added successfully!');
      resetForm();
    } catch (error) {
      if (error.response && error.response.data) {
        const apiError = error.response.data;
        if (apiError.apierror.subErrors && apiError.apierror.subErrors.length > 0) {
          const fieldErrors = {};
          apiError.apierror.subErrors.forEach((subError) => {
            fieldErrors[subError.field] = subError.message;
          });
          setErrors(fieldErrors);
        }
        toast.error(apiError.apierror.message || 'An error occurred!');
      } else {
        toast.error('Server error! Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb
        title="Add Product"
        links={[
          { label: 'Home', path: '/', icon: 'fas fa-home' },
          { label: 'Products', path: '/products', icon: 'fas fa-boxes' },
          { label: 'Add Product', active: true, icon: 'fas fa-plus-circle' },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, setFieldValue, isSubmitting, resetForm }) => (
              <FormikForm noValidate>
                <Row className="g-4">
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
                          />
                        </Form.Group>
                        <Row className="mt-3">
                          <Col sm={6}>
                            <Form.Group controlId="sku">
                              <Form.Label>SKU *</Form.Label>
                              <Form.Control
                                name="sku"
                                type="text"
                                value={values.sku}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
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
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
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
                            </Form.Group>
                          </Col>
                          <Col sm={4}>
                            <Form.Group controlId="allocated">
                              <Form.Label>Allocated</Form.Label>
                              <Form.Control
                                name="allocated"
                                type="number"
                                value={values.allocated}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={4}>
                            <Form.Group controlId="onHand">
                              <Form.Label>On Hand</Form.Label>
                              <Form.Control
                                name="onHand"
                                type="number"
                                value={values.onHand}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
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
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="height">
                          <Form.Label>Height</Form.Label>
                          <Form.Control
                            name="height"
                            type="number"
                            step="0.1"
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="weight">
                          <Form.Label>Weight</Form.Label>
                          <Form.Control
                            name="weight"
                            type="number"
                            step="0.1"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="unitMeasurementInWeight">
                          <Form.Label>Unit</Form.Label>
                          <Form.Select
                            name="unitMeasurementInWeight"
                            value={values.unitMeasurementInWeight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Unit</option>
                            {unitMeasurements.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
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
                    {isSubmitting ? <Spinner animation="border" size="sm" className="me-1" /> : 'Create Product'}
                    {isSubmitting && ' Saving...'}
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default ProductFormPage;
