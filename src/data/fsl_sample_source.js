let sampleSource = [
    {
         fileName: 'genki.jpg',
         filePath: '../img/test image/genki.jpg',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: '元気壽司'},
             {field_name: 'mall_name', extracted_data: 'TSUEN WAN PL2'},
             {field_name: 'address', extracted_data: 'SHOP B185-B188 TSUEN WAN PL2 TSUEN WAN NT'},
             {field_name: 'date', extracted_data: 'MAR 1, 2019'},
             {field_name: 'total_amount', extracted_data: '411.40'},
             {field_name: 'reference_number', extracted_data: '262985'},
 
             {field_name: 'shop_address', extracted_data: 'SHOP B185-B188 TSUEN WAN PL2 TSUEN WAN NT'},
             {field_name: 'credit_card_type', extracted_data: 'VISA'},
             {field_name: 'card_type', extracted_data: 'VISA'},
             {field_name: 'credit_card', extracted_data: 'VISA'},
 
             {field_name: 'merchant_chinese_name', extracted_data: '元気壽司'},
             {field_name: 'merchant_english_name', extracted_data: 'GENKI'},
 
             {field_name: 'chinese_merchant_name', extracted_data: '元気壽司'},
             {field_name: 'chinese_name', extracted_data: '元気壽司'},
             {field_name: 'merchant_chinese_name', extracted_data: '元気壽司'},
             {field_name: 'chinese_shop_name', extracted_data: '元気壽司'},
             {field_name: 'shop_chinese_name', extracted_data: '元気壽司'},
             {field_name: 'merchant_english_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'shop_english_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'english_merchant_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'english_shop_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'eng_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'english_name', extracted_data: 'GENKI KOUSOKU'},
             {field_name: 'time', extracted_data: '22:30'},
             {field_name: 'receipt_time', extracted_data: '22:30'},
        ]
    },
    {
         fileName: 'crystal_jade.jpg',
         filePath: '../img/test image/crystal_jade.jpg',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'mall_name', extracted_data: '銅鑼灣時代廣場'},
             {field_name: 'address', extracted_data: '銅鑼灣時代廣場地庫B221A舖'},
             {field_name: 'payment_method', extracted_data: ''},
             {field_name: 'date', extracted_data: '24/01/19'},
             {field_name: 'total_amount', extracted_data: '310.00'},
             {field_name: 'reference_number', extracted_data: '67199'},
 
             {field_name: 'shop_address', extracted_data: '銅鑼灣時代廣場地庫B221A舖'},
             {field_name: 'merchant_address', extracted_data: '銅鑼灣時代廣場地庫B221A舖'},
             {field_name: 'chinese_merchant_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'chinese_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'merchant_chinese_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'chinese_shop_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'shop_chinese_name', extracted_data: '翡翠拉麵小籠包'},
             {field_name: 'merchant_english_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'shop_english_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'english_merchant_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'english_shop_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'english_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'eng_name', extracted_data: 'CRYSTAL JADE'},
             {field_name: 'phone_number', extracted_data: '2506 0080'},
             {field_name: 'contact_number', extracted_data: '2506 0080'},
             {field_name: 'contact', extracted_data: '2506 0080'},
             {field_name: 'phone', extracted_data: '2506 0080'},
             {field_name: 'tel', extracted_data: '2506 0080'},
             {field_name: 'time', extracted_data: '21:37'},
             {field_name: 'receipt_time', extracted_data: '21:37'},
        ]
    },
    {
         fileName: 'yoshinoya.jpg',
         filePath: '../img/test image/yoshinoya.jpg',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: '吉野家'},
             {field_name: 'mall_name', extracted_data: '天水圍天耀廣場'},
             {field_name: 'address', extracted_data: '天水圍天耀廣場地庫1樓LG 28號舖'},
             {field_name: 'payment_method', extracted_data: '八達通'},
             {field_name: 'date', extracted_data: '10/02/2019'},
             {field_name: 'total_amount', extracted_data: '44.00'},
             {field_name: 'reference_number', extracted_data: '019627'},
 
             {field_name: 'shop_address', extracted_data: '天水圍天耀廣場地庫1樓LG 28號舖'},
             {field_name: 'merchant_address', extracted_data: '天水圍天耀廣場地庫1樓LG 28號舖'},
             {field_name: 'chinese_merchant_name', extracted_data: '吉野家'},
             {field_name: 'chinese_name', extracted_data: '吉野家'},
             {field_name: 'merchant_chinese_name', extracted_data: '吉野家'},
             {field_name: 'chinese_shop_name', extracted_data: '吉野家'},
             {field_name: 'shop_chinese_name', extracted_data: '吉野家'},
             {field_name: 'merchant_english_name', extracted_data: 'YOSHINOYA'},
             {field_name: 'shop_english_name', extracted_data: 'YOSHINOYA'},
             {field_name: 'english_merchant_name', extracted_data: 'YOSHINOYA'},
             {field_name: 'english_shop_name', extracted_data: 'YOSHINOYA'},
             {field_name: 'english_name', extracted_data: 'YOSHINOYA'},
             {field_name: 'eng_name', extracted_data: 'YOSHINOYA'},
 
             {field_name: 'phone_number', extracted_data: '2673 0833'},
             {field_name: 'contact_number', extracted_data: '2673 0833'},
             {field_name: 'contact', extracted_data: '2673 0833'},
             {field_name: 'phone', extracted_data: '2673 0833'},
             {field_name: 'tel', extracted_data: '2673 0833'},
 
             {field_name: 'time', extracted_data: '11:05'},
             {field_name: 'receipt_time', extracted_data: '11:05'},
         ]
     },
     {
         fileName: 'yata.jpg',
         filePath: '../img/test image/yata.jpg',
         initialGroundTruth: [
             {field_name: 'merchant_name', extracted_data: 'YATA'},
             {field_name: 'mall_name', extracted_data: 'V City'},
             {field_name: 'address', extracted_data: 'V City 地下'},
             {field_name: 'date', extracted_data: '10/03/19'},
             {field_name: 'total_amount', extracted_data: '2480.00'},
             {field_name: 'reference_number', extracted_data: '960152'},
 
             {field_name: 'shop_address', extracted_data: 'V City 地下'},
             {field_name: 'merchant_address', extracted_data: 'V City 地下'},
 
             {field_name: 'chinese_merchant_name', extracted_data: '一田'},
             {field_name: 'chinese_name', extracted_data: '一田'},
             {field_name: 'merchant_chinese_name', extracted_data: '一田'},
             {field_name: 'chinese_shop_name', extracted_data: '一田'},
             {field_name: 'shop_chinese_name', extracted_data: '一田'},
             {field_name: 'merchant_english_name', extracted_data: 'YATA'},
             {field_name: 'shop_english_name', extracted_data: 'YATA'},
             {field_name: 'english_merchant_name', extracted_data: 'YATA'},
             {field_name: 'english_shop_name', extracted_data: 'YATA'},
             {field_name: 'english_name', extracted_data: 'YATA'},
             {field_name: 'eng_name', extracted_data: 'YATA'},
 
             {field_name: 'phone_number', extracted_data: '2451 3988'},
             {field_name: 'contact_number', extracted_data: '2451 3988'},
             {field_name: 'contact', extracted_data: '2451 3988'},
             {field_name: 'phone', extracted_data: '2451 3988'},
             {field_name: 'tel', extracted_data: '2451 39883'},
 
             {field_name: 'time', extracted_data: '19:07'},
             {field_name: 'receipt_time', extracted_data: '19:07'},
         ]
     },
 ]
 
 export function getSampleSource() {
     return sampleSource;
   }