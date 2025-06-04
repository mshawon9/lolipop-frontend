import * as Yup from 'yup';

const ProductImageSchema = Yup.object({
    id: Yup.string()
        .required('Image ID is required'),
    url: Yup.string()
        .url('Must be a valid URL')
        .required('Image URL is required'),
    altText: Yup.string()
        .optional(),
    file: Yup.mixed()
        .test(
            'fileType',
            'Must be a File object',
            value => !value || value instanceof File
        )
        .optional(),
});

export default ProductImageSchema;

