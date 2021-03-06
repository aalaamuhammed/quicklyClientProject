const governorate = [
  {
    id: 1,
    name: 'القاهرة',
    name_en: 'Cairo',
  },
  {
    id: 2,
    name: 'الجيزة',
    name_en: 'Giza',
  },
  {
    id: 3,
    name: 'الأسكندرية',
    name_en: 'Alexandria',
  },
  {
    id: 4,
    name: 'الدقهلية',
    name_en: 'Dakahlia',
  },
  {
    id: 5,
    name: 'البحر الأحمر',
    name_en: 'Red Sea',
  },
  {
    id: 6,
    name: 'البحيرة',
    name_en: 'Beheira',
  },
  {
    id: 7,
    name: 'الفيوم',
    name_en: 'Fayoum',
  },
  {
    id: 8,
    name: 'الغربية',
    name_en: 'Gharbiya',
  },
  {
    id: 9,
    name: 'الإسماعلية',
    name_en: 'Ismailia',
  },
  {
    id: 10,
    name: 'المنوفية',
    name_en: 'Monofia',
  },
  {
    id: 11,
    name: 'المنيا',
    name_en: 'Minya',
  },
  {
    id: 12,
    name: 'القليوبية',
    name_en: 'Qaliubiya',
  },
  {
    id: 13,
    name: 'الوادي الجديد',
    name_en: 'New Valley',
  },
  {
    id: 14,
    name: 'السويس',
    name_en: 'Suez',
  },
  {
    id: 15,
    name: 'اسوان',
    name_en: 'Aswan',
  },
  {
    id: 16,
    name: 'اسيوط',
    name_en: 'Assiut',
  },
  {
    id: 17,
    name: 'بني سويف',
    name_en: 'Beni Suef',
  },
  {
    id: 18,
    name: 'بورسعيد',
    name_en: 'Port Said',
  },
  {
    id: 19,
    name: 'دمياط',
    name_en: 'Damietta',
  },
  {
    id: 20,
    name: 'الشرقية',
    name_en: 'Sharkia',
  },
  {
    id: 21,
    name: 'جنوب سيناء',
    name_en: 'South Sinai',
  },
  {
    id: 22,
    name: 'كفر الشيخ',
    name_en: 'Kafr Al sheikh',
  },
  {
    id: 23,
    name: 'مطروح',
    name_en: 'Matrouh',
  },
  {
    id: 24,
    name: 'الأقصر',
    name_en: 'Luxor',
  },
  {
    id: 25,
    name: 'قنا',
    name_en: 'Qena',
  },
  {
    id: 26,
    name: 'شمال سيناء',
    name_en: 'North Sinai',
  },
  {
    id: 27,
    name: 'سوهاج',
    name_en: 'Sohag',
  },
];
const cities = [
  {
    id: 1,
    name: 'القاهره',
    name_en: 'Cairo',
    gov_id: 1,
  },
  {
    id: 2,
    name: 'الجيزة',
    name_en: 'Giza',
    gov_id: 2,
  },
  {
    id: 3,
    name: 'السادس من أكتوبر',
    name_en: 'Sixth of October',
    gov_id: 2,
  },
  {
    id: 4,
    name: 'الشيخ زايد\n',
    name_en: 'Cheikh Zayed',
    gov_id: 2,
  },
  {
    id: 5,
    name: 'الحوامدية',
    name_en: 'Hawamdiyah',
    gov_id: 2,
  },
  {
    id: 6,
    name: 'البدرشين',
    name_en: 'Al Badrasheen',
    gov_id: 2,
  },
  {
    id: 7,
    name: 'الصف',
    name_en: 'Saf',
    gov_id: 2,
  },
  {
    id: 8,
    name: 'أطفيح',
    name_en: 'Atfih',
    gov_id: 2,
  },
  {
    id: 9,
    name: 'العياط',
    name_en: 'Al Ayat',
    gov_id: 2,
  },
  {
    id: 10,
    name: 'الباويطي',
    name_en: 'Al-Bawaiti',
    gov_id: 2,
  },
  {
    id: 11,
    name: 'منشأة القناطر',
    name_en: 'ManshiyetAl Qanater',
    gov_id: 2,
  },
  {
    id: 12,
    name: 'أوسيم',
    name_en: 'Oaseem',
    gov_id: 2,
  },
  {
    id: 13,
    name: 'كرداسة',
    name_en: 'Kerdasa',
    gov_id: 2,
  },
  {
    id: 14,
    name: 'أبو النمرس',
    name_en: 'Abu Nomros',
    gov_id: 2,
  },
  {
    id: 15,
    name: 'كفر غطاطي',
    name_en: 'Kafr Ghati',
    gov_id: 2,
  },
  {
    id: 16,
    name: 'منشأة البكاري',
    name_en: 'Manshiyet Al Bakari',
    gov_id: 2,
  },
  {
    id: 17,
    name: 'الأسكندرية',
    name_en: 'Alexandria',
    gov_id: 3,
  },
  {
    id: 18,
    name: 'برج العرب',
    name_en: 'Burj Al Arab',
    gov_id: 3,
  },
  {
    id: 19,
    name: 'برج العرب الجديدة',
    name_en: 'New Burj Al Arab',
    gov_id: 3,
  },
  {
    id: 20,
    name: 'بنها',
    name_en: 'Banha',
    gov_id: 12,
  },
  {
    id: 21,
    name: 'قليوب',
    name_en: 'Qalyub',
    gov_id: 12,
  },
  {
    id: 22,
    name: 'شبرا الخيمة',
    name_en: 'Shubra Al Khaimah',
    gov_id: 12,
  },
  {
    id: 23,
    name: 'القناطر الخيرية',
    name_en: 'Al Qanater Charity',
    gov_id: 12,
  },
  {
    id: 24,
    name: 'الخانكة',
    name_en: 'Khanka',
    gov_id: 12,
  },
  {
    id: 25,
    name: 'كفر شكر',
    name_en: 'Kafr Shukr',
    gov_id: 12,
  },
  {
    id: 26,
    name: 'طوخ',
    name_en: 'Tukh',
    gov_id: 12,
  },
  {
    id: 27,
    name: 'قها',
    name_en: 'Qaha',
    gov_id: 12,
  },
  {
    id: 28,
    name: 'العبور',
    name_en: 'Obour',
    gov_id: 12,
  },
  {
    id: 29,
    name: 'الخصوص',
    name_en: 'Khosous',
    gov_id: 12,
  },
  {
    id: 30,
    name: 'شبين القناطر',
    name_en: 'Shibin Al Qanater',
    gov_id: 12,
  },
  {
    id: 31,
    name: 'دمنهور',
    name_en: 'Damanhour',
    gov_id: 6,
  },
  {
    id: 32,
    name: 'كفر الدوار',
    name_en: 'Kafr El Dawar',
    gov_id: 6,
  },
  {
    id: 33,
    name: 'رشيد',
    name_en: 'Rashid',
    gov_id: 6,
  },
  {
    id: 34,
    name: 'إدكو',
    name_en: 'Edco',
    gov_id: 6,
  },
  {
    id: 35,
    name: 'أبو المطامير',
    name_en: 'Abu al-Matamir',
    gov_id: 6,
  },
  {
    id: 36,
    name: 'أبو حمص',
    name_en: 'Abu Homs',
    gov_id: 6,
  },
  {
    id: 37,
    name: 'الدلنجات',
    name_en: 'Delengat',
    gov_id: 6,
  },
  {
    id: 38,
    name: 'المحمودية',
    name_en: 'Mahmoudiyah',
    gov_id: 6,
  },
  {
    id: 39,
    name: 'الرحمانية',
    name_en: 'Rahmaniyah',
    gov_id: 6,
  },
  {
    id: 40,
    name: 'إيتاي البارود',
    name_en: 'Itai Baroud',
    gov_id: 6,
  },
  {
    id: 41,
    name: 'حوش عيسى',
    name_en: 'Housh Eissa',
    gov_id: 6,
  },
  {
    id: 42,
    name: 'شبراخيت',
    name_en: 'Shubrakhit',
    gov_id: 6,
  },
  {
    id: 43,
    name: 'كوم حمادة',
    name_en: 'Kom Hamada',
    gov_id: 6,
  },
  {
    id: 44,
    name: 'بدر',
    name_en: 'Badr',
    gov_id: 6,
  },
  {
    id: 45,
    name: 'وادي النطرون',
    name_en: 'Wadi Natrun',
    gov_id: 6,
  },
  {
    id: 46,
    name: 'النوبارية الجديدة',
    name_en: 'New Nubaria',
    gov_id: 6,
  },
  {
    id: 47,
    name: 'مرسى مطروح',
    name_en: 'Marsa Matrouh',
    gov_id: 23,
  },
  {
    id: 48,
    name: 'الحمام',
    name_en: 'El Hamam',
    gov_id: 23,
  },
  {
    id: 49,
    name: 'العلمين',
    name_en: 'Alamein',
    gov_id: 23,
  },
  {
    id: 50,
    name: 'الضبعة',
    name_en: 'Dabaa',
    gov_id: 23,
  },
  {
    id: 51,
    name: 'النجيلة',
    name_en: 'Al-Nagila',
    gov_id: 23,
  },
  {
    id: 52,
    name: 'سيدي براني',
    name_en: 'Sidi Brani',
    gov_id: 23,
  },
  {
    id: 53,
    name: 'السلوم',
    name_en: 'Salloum',
    gov_id: 23,
  },
  {
    id: 54,
    name: 'سيوة',
    name_en: 'Siwa',
    gov_id: 23,
  },
  {
    id: 55,
    name: 'دمياط',
    name_en: 'Damietta',
    gov_id: 19,
  },
  {
    id: 56,
    name: 'دمياط الجديدة',
    name_en: 'New Damietta',
    gov_id: 19,
  },
  {
    id: 57,
    name: 'رأس البر',
    name_en: 'Ras El Bar',
    gov_id: 19,
  },
  {
    id: 58,
    name: 'فارسكور',
    name_en: 'Faraskour',
    gov_id: 19,
  },
  {
    id: 59,
    name: 'الزرقا',
    name_en: 'Zarqa',
    gov_id: 19,
  },
  {
    id: 60,
    name: 'السرو',
    name_en: 'alsaru',
    gov_id: 19,
  },
  {
    id: 61,
    name: 'الروضة',
    name_en: 'alruwda',
    gov_id: 19,
  },
  {
    id: 62,
    name: 'كفر البطيخ',
    name_en: 'Kafr El-Batikh',
    gov_id: 19,
  },
  {
    id: 63,
    name: 'عزبة البرج',
    name_en: 'Azbet Al Burg',
    gov_id: 19,
  },
  {
    id: 64,
    name: 'ميت أبو غالب',
    name_en: 'Meet Abou Ghalib',
    gov_id: 19,
  },
  {
    id: 65,
    name: 'كفر سعد',
    name_en: 'Kafr Saad',
    gov_id: 19,
  },
  {
    id: 66,
    name: 'المنصورة',
    name_en: 'Mansoura',
    gov_id: 4,
  },
  {
    id: 67,
    name: 'طلخا',
    name_en: 'Talkha',
    gov_id: 4,
  },
  {
    id: 68,
    name: 'ميت غمر',
    name_en: 'Mitt Ghamr',
    gov_id: 4,
  },
  {
    id: 69,
    name: 'دكرنس',
    name_en: 'Dekernes',
    gov_id: 4,
  },
  {
    id: 70,
    name: 'أجا',
    name_en: 'Aga',
    gov_id: 4,
  },
  {
    id: 71,
    name: 'منية النصر',
    name_en: 'Menia El Nasr',
    gov_id: 4,
  },
  {
    id: 72,
    name: 'السنبلاوين',
    name_en: 'Sinbillawin',
    gov_id: 4,
  },
  {
    id: 73,
    name: 'الكردي',
    name_en: 'El Kurdi',
    gov_id: 4,
  },
  {
    id: 74,
    name: 'بني عبيد',
    name_en: 'Bani Ubaid',
    gov_id: 4,
  },
  {
    id: 75,
    name: 'المنزلة',
    name_en: 'Al Manzala',
    gov_id: 4,
  },
  {
    id: 76,
    name: 'تمي الأمديد',
    name_en: "tami al\\'amdid",
    gov_id: 4,
  },
  {
    id: 77,
    name: 'الجمالية',
    name_en: 'aljamalia',
    gov_id: 4,
  },
  {
    id: 78,
    name: 'شربين',
    name_en: 'Sherbin',
    gov_id: 4,
  },
  {
    id: 79,
    name: 'المطرية',
    name_en: 'Mataria',
    gov_id: 4,
  },
  {
    id: 80,
    name: 'بلقاس',
    name_en: 'Belqas',
    gov_id: 4,
  },
  {
    id: 81,
    name: 'ميت سلسيل',
    name_en: 'Meet Salsil',
    gov_id: 4,
  },
  {
    id: 82,
    name: 'جمصة',
    name_en: 'Gamasa',
    gov_id: 4,
  },
  {
    id: 83,
    name: 'محلة دمنة',
    name_en: 'Mahalat Damana',
    gov_id: 4,
  },
  {
    id: 84,
    name: 'نبروه',
    name_en: 'Nabroh',
    gov_id: 4,
  },
  {
    id: 85,
    name: 'كفر الشيخ',
    name_en: 'Kafr El Sheikh',
    gov_id: 22,
  },
  {
    id: 86,
    name: 'دسوق',
    name_en: 'Desouq',
    gov_id: 22,
  },
  {
    id: 87,
    name: 'فوه',
    name_en: 'Fooh',
    gov_id: 22,
  },
  {
    id: 88,
    name: 'مطوبس',
    name_en: 'Metobas',
    gov_id: 22,
  },
  {
    id: 89,
    name: 'برج البرلس',
    name_en: 'Burg Al Burullus',
    gov_id: 22,
  },
  {
    id: 90,
    name: 'بلطيم',
    name_en: 'Baltim',
    gov_id: 22,
  },
  {
    id: 91,
    name: 'مصيف بلطيم',
    name_en: 'Masief Baltim',
    gov_id: 22,
  },
  {
    id: 92,
    name: 'الحامول',
    name_en: 'Hamol',
    gov_id: 22,
  },
  {
    id: 93,
    name: 'بيلا',
    name_en: 'Bella',
    gov_id: 22,
  },
  {
    id: 94,
    name: 'الرياض',
    name_en: 'Riyadh',
    gov_id: 22,
  },
  {
    id: 95,
    name: 'سيدي سالم',
    name_en: 'Sidi Salm',
    gov_id: 22,
  },
  {
    id: 96,
    name: 'قلين',
    name_en: 'Qellen',
    gov_id: 22,
  },
  {
    id: 97,
    name: 'سيدي غازي',
    name_en: 'Sidi Ghazi',
    gov_id: 22,
  },
  {
    id: 98,
    name: 'طنطا',
    name_en: 'Tanta',
    gov_id: 8,
  },
  {
    id: 99,
    name: 'المحلة الكبرى',
    name_en: 'Al Mahalla Al Kobra',
    gov_id: 8,
  },
  {
    id: 100,
    name: 'كفر الزيات',
    name_en: 'Kafr El Zayat',
    gov_id: 8,
  },
  {
    id: 101,
    name: 'زفتى',
    name_en: 'Zefta',
    gov_id: 8,
  },
  {
    id: 102,
    name: 'السنطة',
    name_en: 'El Santa',
    gov_id: 8,
  },
  {
    id: 103,
    name: 'قطور',
    name_en: 'Qutour',
    gov_id: 8,
  },
  {
    id: 104,
    name: 'بسيون',
    name_en: 'Basion',
    gov_id: 8,
  },
  {
    id: 105,
    name: 'سمنود',
    name_en: 'Samannoud',
    gov_id: 8,
  },
  {
    id: 106,
    name: 'شبين الكوم',
    name_en: 'Shbeen El Koom',
    gov_id: 10,
  },
  {
    id: 107,
    name: 'مدينة السادات',
    name_en: 'Sadat City',
    gov_id: 10,
  },
  {
    id: 108,
    name: 'منوف',
    name_en: 'Menouf',
    gov_id: 10,
  },
  {
    id: 109,
    name: 'سرس الليان',
    name_en: 'Sars El-Layan',
    gov_id: 10,
  },
  {
    id: 110,
    name: 'أشمون',
    name_en: 'Ashmon',
    gov_id: 10,
  },
  {
    id: 111,
    name: 'الباجور',
    name_en: 'Al Bagor',
    gov_id: 10,
  },
  {
    id: 112,
    name: 'قويسنا',
    name_en: 'Quesna',
    gov_id: 10,
  },
  {
    id: 113,
    name: 'بركة السبع',
    name_en: 'Berkat El Saba',
    gov_id: 10,
  },
  {
    id: 114,
    name: 'تلا',
    name_en: 'Tala',
    gov_id: 10,
  },
  {
    id: 115,
    name: 'الشهداء',
    name_en: 'Al Shohada',
    gov_id: 10,
  },
  {
    id: 116,
    name: 'الزقازيق',
    name_en: 'Zagazig',
    gov_id: 20,
  },
  {
    id: 117,
    name: 'العاشر من رمضان',
    name_en: 'Al Ashr Men Ramadan',
    gov_id: 20,
  },
  {
    id: 118,
    name: 'منيا القمح',
    name_en: 'Minya Al Qamh',
    gov_id: 20,
  },
  {
    id: 119,
    name: 'بلبيس',
    name_en: 'Belbeis',
    gov_id: 20,
  },
  {
    id: 120,
    name: 'مشتول السوق',
    name_en: 'Mashtoul El Souq',
    gov_id: 20,
  },
  {
    id: 121,
    name: 'القنايات',
    name_en: 'Qenaiat',
    gov_id: 20,
  },
  {
    id: 122,
    name: 'أبو حماد',
    name_en: 'Abu Hammad',
    gov_id: 20,
  },
  {
    id: 123,
    name: 'القرين',
    name_en: 'El Qurain',
    gov_id: 20,
  },
  {
    id: 124,
    name: 'ههيا',
    name_en: 'Hehia',
    gov_id: 20,
  },
  {
    id: 125,
    name: 'أبو كبير',
    name_en: 'Abu Kabir',
    gov_id: 20,
  },
  {
    id: 126,
    name: 'فاقوس',
    name_en: 'Faccus',
    gov_id: 20,
  },
  {
    id: 127,
    name: 'الصالحية الجديدة',
    name_en: 'El Salihia El Gedida',
    gov_id: 20,
  },
  {
    id: 128,
    name: 'الإبراهيمية',
    name_en: 'Al Ibrahimiyah',
    gov_id: 20,
  },
  {
    id: 129,
    name: 'ديرب نجم',
    name_en: 'Deirb Negm',
    gov_id: 20,
  },
  {
    id: 130,
    name: 'كفر صقر',
    name_en: 'Kafr Saqr',
    gov_id: 20,
  },
  {
    id: 131,
    name: 'أولاد صقر',
    name_en: 'Awlad Saqr',
    gov_id: 20,
  },
  {
    id: 132,
    name: 'الحسينية',
    name_en: 'Husseiniya',
    gov_id: 20,
  },
  {
    id: 133,
    name: 'صان الحجر القبلية',
    name_en: 'san alhajar alqablia',
    gov_id: 20,
  },
  {
    id: 134,
    name: 'منشأة أبو عمر',
    name_en: 'Manshayat Abu Omar',
    gov_id: 20,
  },
  {
    id: 135,
    name: 'بورسعيد',
    name_en: 'PorSaid',
    gov_id: 18,
  },
  {
    id: 136,
    name: 'بورفؤاد',
    name_en: 'PorFouad',
    gov_id: 18,
  },
  {
    id: 137,
    name: 'الإسماعيلية',
    name_en: 'Ismailia',
    gov_id: 9,
  },
  {
    id: 138,
    name: 'فايد',
    name_en: 'Fayed',
    gov_id: 9,
  },
  {
    id: 139,
    name: 'القنطرة شرق',
    name_en: 'Qantara Sharq',
    gov_id: 9,
  },
  {
    id: 140,
    name: 'القنطرة غرب',
    name_en: 'Qantara Gharb',
    gov_id: 9,
  },
  {
    id: 141,
    name: 'التل الكبير',
    name_en: 'El Tal El Kabier',
    gov_id: 9,
  },
  {
    id: 142,
    name: 'أبو صوير',
    name_en: 'Abu Sawir',
    gov_id: 9,
  },
  {
    id: 143,
    name: 'القصاصين الجديدة',
    name_en: 'Kasasien El Gedida',
    gov_id: 9,
  },
  {
    id: 144,
    name: 'السويس',
    name_en: 'Suez',
    gov_id: 14,
  },
  {
    id: 145,
    name: 'العريش',
    name_en: 'Arish',
    gov_id: 26,
  },
  {
    id: 146,
    name: 'الشيخ زويد',
    name_en: 'Sheikh Zowaid',
    gov_id: 26,
  },
  {
    id: 147,
    name: 'نخل',
    name_en: 'Nakhl',
    gov_id: 26,
  },
  {
    id: 148,
    name: 'رفح',
    name_en: 'Rafah',
    gov_id: 26,
  },
  {
    id: 149,
    name: 'بئر العبد',
    name_en: 'Bir al-Abed',
    gov_id: 26,
  },
  {
    id: 150,
    name: 'الحسنة',
    name_en: 'Al Hasana',
    gov_id: 26,
  },
  {
    id: 151,
    name: 'الطور',
    name_en: 'Al Toor',
    gov_id: 21,
  },
  {
    id: 152,
    name: 'شرم الشيخ',
    name_en: 'Sharm El-Shaikh',
    gov_id: 21,
  },
  {
    id: 153,
    name: 'دهب',
    name_en: 'Dahab',
    gov_id: 21,
  },
  {
    id: 154,
    name: 'نويبع',
    name_en: 'Nuweiba',
    gov_id: 21,
  },
  {
    id: 155,
    name: 'طابا',
    name_en: 'Taba',
    gov_id: 21,
  },
  {
    id: 156,
    name: 'سانت كاترين',
    name_en: 'Saint Catherine',
    gov_id: 21,
  },
  {
    id: 157,
    name: 'أبو رديس',
    name_en: 'Abu Redis',
    gov_id: 21,
  },
  {
    id: 158,
    name: 'أبو زنيمة',
    name_en: 'Abu Zenaima',
    gov_id: 21,
  },
  {
    id: 159,
    name: 'رأس سدر',
    name_en: 'Ras Sidr',
    gov_id: 21,
  },
  {
    id: 160,
    name: 'بني سويف',
    name_en: 'Bani Sweif',
    gov_id: 17,
  },
  {
    id: 161,
    name: 'بني سويف الجديدة',
    name_en: 'Beni Suef El Gedida',
    gov_id: 17,
  },
  {
    id: 162,
    name: 'الواسطى',
    name_en: 'Al Wasta',
    gov_id: 17,
  },
  {
    id: 163,
    name: 'ناصر',
    name_en: 'Naser',
    gov_id: 17,
  },
  {
    id: 164,
    name: 'إهناسيا',
    name_en: 'Ehnasia',
    gov_id: 17,
  },
  {
    id: 165,
    name: 'ببا',
    name_en: 'beba',
    gov_id: 17,
  },
  {
    id: 166,
    name: 'الفشن',
    name_en: 'Fashn',
    gov_id: 17,
  },
  {
    id: 167,
    name: 'سمسطا',
    name_en: 'Somasta',
    gov_id: 17,
  },
  {
    id: 168,
    name: 'الفيوم',
    name_en: 'Fayoum',
    gov_id: 7,
  },
  {
    id: 169,
    name: 'الفيوم الجديدة',
    name_en: 'Fayoum El Gedida',
    gov_id: 7,
  },
  {
    id: 170,
    name: 'طامية',
    name_en: 'Tamiya',
    gov_id: 7,
  },
  {
    id: 171,
    name: 'سنورس',
    name_en: 'Snores',
    gov_id: 7,
  },
  {
    id: 172,
    name: 'إطسا',
    name_en: 'Etsa',
    gov_id: 7,
  },
  {
    id: 173,
    name: 'إبشواي',
    name_en: 'Epschway',
    gov_id: 7,
  },
  {
    id: 174,
    name: 'يوسف الصديق',
    name_en: 'Yusuf El Sediaq',
    gov_id: 7,
  },
  {
    id: 175,
    name: 'المنيا',
    name_en: 'Minya',
    gov_id: 11,
  },
  {
    id: 176,
    name: 'المنيا الجديدة',
    name_en: 'Minya El Gedida',
    gov_id: 11,
  },
  {
    id: 177,
    name: 'العدوة',
    name_en: 'El Adwa',
    gov_id: 11,
  },
  {
    id: 178,
    name: 'مغاغة',
    name_en: 'Magagha',
    gov_id: 11,
  },
  {
    id: 179,
    name: 'بني مزار',
    name_en: 'Bani Mazar',
    gov_id: 11,
  },
  {
    id: 180,
    name: 'مطاي',
    name_en: 'Mattay',
    gov_id: 11,
  },
  {
    id: 181,
    name: 'سمالوط',
    name_en: 'Samalut',
    gov_id: 11,
  },
  {
    id: 182,
    name: 'المدينة الفكرية',
    name_en: 'Madinat El Fekria',
    gov_id: 11,
  },
  {
    id: 183,
    name: 'ملوي',
    name_en: 'Meloy',
    gov_id: 11,
  },
  {
    id: 184,
    name: 'دير مواس',
    name_en: 'Deir Mawas',
    gov_id: 11,
  },
  {
    id: 185,
    name: 'أسيوط',
    name_en: 'Assiut',
    gov_id: 16,
  },
  {
    id: 186,
    name: 'أسيوط الجديدة',
    name_en: 'Assiut El Gedida',
    gov_id: 16,
  },
  {
    id: 187,
    name: 'ديروط',
    name_en: 'Dayrout',
    gov_id: 16,
  },
  {
    id: 188,
    name: 'منفلوط',
    name_en: 'Manfalut',
    gov_id: 16,
  },
  {
    id: 189,
    name: 'القوصية',
    name_en: 'Qusiya',
    gov_id: 16,
  },
  {
    id: 190,
    name: 'أبنوب',
    name_en: 'Abnoub',
    gov_id: 16,
  },
  {
    id: 191,
    name: 'أبو تيج',
    name_en: 'Abu Tig',
    gov_id: 16,
  },
  {
    id: 192,
    name: 'الغنايم',
    name_en: 'El Ghanaim',
    gov_id: 16,
  },
  {
    id: 193,
    name: 'ساحل سليم',
    name_en: 'Sahel Selim',
    gov_id: 16,
  },
  {
    id: 194,
    name: 'البداري',
    name_en: 'El Badari',
    gov_id: 16,
  },
  {
    id: 195,
    name: 'صدفا',
    name_en: 'Sidfa',
    gov_id: 16,
  },
  {
    id: 196,
    name: 'الخارجة',
    name_en: 'El Kharga',
    gov_id: 13,
  },
  {
    id: 197,
    name: 'باريس',
    name_en: 'Paris',
    gov_id: 13,
  },
  {
    id: 198,
    name: 'موط',
    name_en: 'Mout',
    gov_id: 13,
  },
  {
    id: 199,
    name: 'الفرافرة',
    name_en: 'Farafra',
    gov_id: 13,
  },
  {
    id: 200,
    name: 'بلاط',
    name_en: 'Balat',
    gov_id: 13,
  },
  {
    id: 201,
    name: 'الغردقة',
    name_en: 'Hurghada',
    gov_id: 5,
  },
  {
    id: 202,
    name: 'رأس غارب',
    name_en: 'Ras Ghareb',
    gov_id: 5,
  },
  {
    id: 203,
    name: 'سفاجا',
    name_en: 'Safaga',
    gov_id: 5,
  },
  {
    id: 204,
    name: 'القصير',
    name_en: 'El Qusiar',
    gov_id: 5,
  },
  {
    id: 205,
    name: 'مرسى علم',
    name_en: 'Marsa Alam',
    gov_id: 5,
  },
  {
    id: 206,
    name: 'الشلاتين',
    name_en: 'Shalatin',
    gov_id: 5,
  },
  {
    id: 207,
    name: 'حلايب',
    name_en: 'Halaib',
    gov_id: 5,
  },
  {
    id: 208,
    name: 'سوهاج',
    name_en: 'Sohag',
    gov_id: 27,
  },
  {
    id: 209,
    name: 'سوهاج الجديدة',
    name_en: 'Sohag El Gedida',
    gov_id: 27,
  },
  {
    id: 210,
    name: 'أخميم',
    name_en: 'Akhmeem',
    gov_id: 27,
  },
  {
    id: 211,
    name: 'أخميم الجديدة',
    name_en: 'Akhmim El Gedida',
    gov_id: 27,
  },
  {
    id: 212,
    name: 'البلينا',
    name_en: 'Albalina',
    gov_id: 27,
  },
  {
    id: 213,
    name: 'المراغة',
    name_en: 'El Maragha',
    gov_id: 27,
  },
  {
    id: 214,
    name: 'المنشأة',
    name_en: "almunsha\\'a",
    gov_id: 27,
  },
  {
    id: 215,
    name: 'دار السلام',
    name_en: 'Dar AISalaam',
    gov_id: 27,
  },
  {
    id: 216,
    name: 'جرجا',
    name_en: 'Gerga',
    gov_id: 27,
  },
  {
    id: 217,
    name: 'جهينة الغربية',
    name_en: 'Jahina Al Gharbia',
    gov_id: 27,
  },
  {
    id: 218,
    name: 'ساقلته',
    name_en: 'Saqilatuh',
    gov_id: 27,
  },
  {
    id: 219,
    name: 'طما',
    name_en: 'Tama',
    gov_id: 27,
  },
  {
    id: 220,
    name: 'طهطا',
    name_en: 'Tahta',
    gov_id: 27,
  },
  {
    id: 221,
    name: 'قنا',
    name_en: 'Qena',
    gov_id: 25,
  },
  {
    id: 222,
    name: 'قنا الجديدة',
    name_en: 'New Qena',
    gov_id: 25,
  },
  {
    id: 223,
    name: 'أبو تشت',
    name_en: 'Abu Tesht',
    gov_id: 25,
  },
  {
    id: 224,
    name: 'نجع حمادي',
    name_en: 'Nag Hammadi',
    gov_id: 25,
  },
  {
    id: 225,
    name: 'دشنا',
    name_en: 'Deshna',
    gov_id: 25,
  },
  {
    id: 226,
    name: 'الوقف',
    name_en: 'Alwaqf',
    gov_id: 25,
  },
  {
    id: 227,
    name: 'قفط',
    name_en: 'Qaft',
    gov_id: 25,
  },
  {
    id: 228,
    name: 'نقادة',
    name_en: 'Naqada',
    gov_id: 25,
  },
  {
    id: 229,
    name: 'فرشوط',
    name_en: 'Farshout',
    gov_id: 25,
  },
  {
    id: 230,
    name: 'قوص',
    name_en: 'Quos',
    gov_id: 25,
  },
  {
    id: 231,
    name: 'الأقصر',
    name_en: 'Luxor',
    gov_id: 24,
  },
  {
    id: 232,
    name: 'الأقصر الجديدة',
    name_en: 'New Luxor',
    gov_id: 24,
  },
  {
    id: 233,
    name: 'إسنا',
    name_en: 'Esna',
    gov_id: 24,
  },
  {
    id: 234,
    name: 'طيبة الجديدة',
    name_en: 'New Tiba',
    gov_id: 24,
  },
  {
    id: 235,
    name: 'الزينية',
    name_en: 'Al ziynia',
    gov_id: 24,
  },
  {
    id: 236,
    name: 'البياضية',
    name_en: 'Al Bayadieh',
    gov_id: 24,
  },
  {
    id: 237,
    name: 'القرنة',
    name_en: 'Al Qarna',
    gov_id: 24,
  },
  {
    id: 238,
    name: 'أرمنت',
    name_en: 'Armant',
    gov_id: 24,
  },
  {
    id: 239,
    name: 'الطود',
    name_en: 'Al Tud',
    gov_id: 24,
  },
  {
    id: 240,
    name: 'أسوان',
    name_en: 'Aswan',
    gov_id: 15,
  },
  {
    id: 241,
    name: 'أسوان الجديدة',
    name_en: 'Aswan El Gedida',
    gov_id: 15,
  },
  {
    id: 242,
    name: 'دراو',
    name_en: 'Drau',
    gov_id: 15,
  },
  {
    id: 243,
    name: 'كوم أمبو',
    name_en: 'Kom Ombo',
    gov_id: 15,
  },
  {
    id: 244,
    name: 'نصر النوبة',
    name_en: 'Nasr Al Nuba',
    gov_id: 15,
  },
  {
    id: 245,
    name: 'كلابشة',
    name_en: 'Kalabsha',
    gov_id: 15,
  },
  {
    id: 246,
    name: 'إدفو',
    name_en: 'Edfu',
    gov_id: 15,
  },
  {
    id: 247,
    name: 'الرديسية',
    name_en: 'Al-Radisiyah',
    gov_id: 15,
  },
  {
    id: 248,
    name: 'البصيلية',
    name_en: 'Al Basilia',
    gov_id: 15,
  },
  {
    id: 249,
    name: 'السباعية',
    name_en: 'Al Sibaeia',
    gov_id: 15,
  },
  {
    id: 250,
    name: 'ابوسمبل السياحية',
    name_en: 'Abo Simbl Al Siyahia',
    gov_id: 15,
  },
];

export {cities, governorate};
