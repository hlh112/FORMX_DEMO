let schema = [
    {
        extractorType: 'Receipt',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: false},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'unit_price', default_field_name: 'unit_price', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'product_name', default_field_name: 'product_name', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: false},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Credit Card Slip',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: false},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'unit_price', default_field_name: 'unit_price', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'product_name', default_field_name: 'product_name', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: false},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Digital Payment Slip',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: false},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'unit_price', default_field_name: 'unit_price', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'product_name', default_field_name: 'product_name', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: false},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Invoice',
        PreTrainedFields : [
            {field_name: 'bank_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Bank Statement',
        PreTrainedFields : [
            {field_name: 'bank_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'ID card',
        PreTrainedFields : [
            {field_name: 'full_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Passport',
        PreTrainedFields : [
            {field_name: 'full_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Address Proof',
        PreTrainedFields : [
            {field_name: 'full_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Bill of Lading',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Airway Bill',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Shipment Label',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Business Registration',
        PreTrainedFields : [
            {field_name: 'register_number', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Food License',
        PreTrainedFields : [
            {field_name: 'register_number', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Custom',
        PreTrainedFields : [],
        CustomFields : [
            {field_name: 'movie_name', field_type: 'single-line text'},
            {field_name: 'cinema_name', field_type: 'single-line text'}
        ],
    }
]

export function getPreTrainedSchema() {
    return schema;
  }