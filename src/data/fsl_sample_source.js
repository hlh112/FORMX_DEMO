let sampleSource = [
    {
        fileName: 'sample1.png',
        filePath: '../img/sample data/sample1.png',
        initialGroundTruth: [
            {field_name: 'merchant_name', extracted_data: 'IKEA'},
            {field_name: 'total_amount', extracted_data: '1289.00'}
        ]
    },
    {
        fileName: 'sample2.png',
        filePath: '../img/sample data/sample2.png',
        initialGroundTruth: [
            {field_name: 'merchant_name', extracted_data: 'ZARA'},
            {field_name: 'total_amount', extracted_data: '2000.00'}
        ]
    },
    {
         fileName: 'sample3.png',
         filePath: '../img/sample data/sample3.png',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: 'Starbucks'},
             {field_name: 'total_amount', extracted_data: '4000.00'}
         ]
     },
     {
         fileName: 'sample4.png',
         filePath: '../img/sample data/sample4.png',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: 'H&M'},
             {field_name: 'total_amount', extracted_data: '100.00'}
         ]
     },
 ]
 
 export function getSampleSource() {
     return sampleSource;
   }