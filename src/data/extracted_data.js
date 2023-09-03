let extractedData = [
    {
        PreTrainedModelResults : [
            {field_name: 'merchant_name', extracted_data: 'IKEA'},
            {field_name: 'total_amount', extracted_data: '1289.00'}
        ],
        CustomModelResults : [
            {field_name: 'subtotal_amount', extracted_data: '72.00'},
        ]
    }
]

export function getExtractedData() {
    return extractedData;
  }