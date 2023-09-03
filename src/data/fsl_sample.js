let sampleData = [
    {
        extractorID: '001',
        samples: [
            {
                fileName: 'sample1.png',
                fileImage: './path',
                reviewStatus: 'Reviewed',
                dateUploaded: '5 Aug 2023',
                includeStatus: true,
                groundTruth : [
                    {field_name: 'merchant_name', extracted_data: 'IKEA'},
                    {field_name: 'total_amount', extracted_data: '1289.00'}
                ]
            },
            {
                fileName: 'sample2.png',
                fileImage: './path',
                reviewStatus: 'Pending Review',
                dateUploaded: '5 Aug 2023',
                includeStatus: true,
                groundTruth : [
                    {field_name: 'merchant_name', extracted_data: 'IKEA'},
                    {field_name: 'total_amount', extracted_data: '1289.00'}
                ]
            }
        ]
    },
    {
        extractorID: '002',
        samples: [
            {
                fileName: 'sample3.png',
                fileImage: './path',
                reviewStatus: 'Reviewed',
                dateUploaded: '5 Aug 2023',
                includeStatus: false,
                groundTruth : [
                    {field_name: 'merchant_name', extracted_data: 'IKEA'},
                    {field_name: 'total_amount', extracted_data: '1289.00'}
                ]
            },
            {
                fileName: 'sample4.png',
                fileImage: './path',
                reviewStatus: 'Pending Review',
                dateUploaded: '5 Aug 2023',
                includeStatus: true,
                groundTruth : [
                    {field_name: 'merchant_name', extracted_data: 'IKEA'},
                    {field_name: 'total_amount', extracted_data: '1289.00'}
                ]
            }
        ]
    }
]

export function getSampleData() {
    return sampleData;
  }