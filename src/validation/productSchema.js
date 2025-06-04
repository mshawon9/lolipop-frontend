import * as Yup from 'yup';
import { Product } from '../models/Product';
import ProductImageSchema from "../models/ProductImage";


export const productSchema: Yup.SchemaOf<Product> = Yup.object({
    // Required fields
    name: Yup.string().required('Name is required'),
    sku: Yup.string().required('SKU is required'),

    // Numeric fields that may be empty or null
    price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be positive')
        .nullable(true)
        .optional(), // If you want it optional

    available: Yup.number()
        .typeError('Available must be a number')
        .min(0, 'Cannot be negative')
        .nullable(true)
        .optional(),

    allocated: Yup.number()
        .typeError('Allocated must be a number')
        .min(0, 'Cannot be negative')
        .nullable(true)
        .optional(),

    onHand: Yup.number()
        .typeError('On hand must be a number')
        .min(0, 'Cannot be negative')
        .nullable(true)
        .optional(),

    // For any string fields that can be empty or missing, use .optional() or .nullable().
    description: Yup.string().nullable(true).optional(),
    shortName: Yup.string().nullable(true).optional(),
    barcode: Yup.string().nullable(true).optional(),
    manufacturer: Yup.string().nullable(true).optional(),
    manufacturePartNumber: Yup.string().nullable(true).optional(),
    oemPartNumber: Yup.string().nullable(true).optional(),
    countryOfOrigin: Yup.string().nullable(true).optional(),
    unitMeasurementInHeight: Yup.string().nullable(true).optional(),
    unitMeasurementInWeight: Yup.string().nullable(true).optional(),

    // For numeric fields that might be empty or not used
    brandId: Yup.number().nullable(true).optional(),
    supplierId: Yup.number().nullable(true).optional(),
    length: Yup.number().nullable(true).optional(),
    height: Yup.number().nullable(true).optional(),
    width: Yup.number().nullable(true).optional(),
    weight: Yup.number().nullable(true).optional(),
    productImages: Yup.array().of(Yup.string().url('Must be valid URL')).default([]),
});
