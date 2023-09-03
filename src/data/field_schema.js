let fieldSchema = [
    {
        extractorID: '001',
        extractorName: 'Receipt',
        extractorIcon: 'ShoppingCart',
        extractorType: 'Pre-trained Extractor',
        lastEditDate: '5 Aug 2023',
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
        extractorID: '002',
        extractorName: 'Movie Ticket',
        extractorType: 'Custom Extractor',
        extractorIcon: 'Repair',
        lastEditDate: '5 Aug 2023',
        PreTrainedFields : [
        ],
        CustomFields : [
            {field_name: 'movie_ticket', field_type: 'single-line text'},
            {field_name: 'lol', field_type: 'monetary_amount'}
        ],
    }
]

export function getFieldsSchema() {
    return fieldSchema;
  }