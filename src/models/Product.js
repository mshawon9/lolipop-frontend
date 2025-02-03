export interface Product {
    id: number;
    name: string;
    description?: string;
    shortName?: string;
    sku: string;
    barcode?: string;
    brandId?: number;
    supplierId?: number;
    price?: number;
    available?: number;
    allocated?: number;
    onHand?: number;
    manufacturer?: string;
    manufacturePartNumber?: string;
    oemPartNumber?: string;
    length?: number;
    height?: number;
    width?: number;
    weight?: number;
    countryOfOrigin?: string;
    unitMeasurementInHeight?: string;
    unitMeasurementInWeight?: string;
}
