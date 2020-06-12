//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
let provinces = [
    {
        "id": 73,
        "psgcCode": "140100000",
        "provDesc": "Abra",
        "regCode": "14",
        "provCode": "1401"
    },
    {
        "id": 84,
        "psgcCode": "160200000",
        "provDesc": "Agusan Del Norte",
        "regCode": "16",
        "provCode": "1602"
    },
    {
        "id": 85,
        "psgcCode": "160300000",
        "provDesc": "Agusan Del Sur",
        "regCode": "16",
        "provCode": "1603"
    },
    {
        "id": 33,
        "psgcCode": "060400000",
        "provDesc": "Aklan",
        "regCode": "06",
        "provCode": "0604"
    },
    {
        "id": 27,
        "psgcCode": "050500000",
        "provDesc": "Albay",
        "regCode": "05",
        "provCode": "0505"
    },
    {
        "id": 34,
        "psgcCode": "060600000",
        "provDesc": "Antique",
        "regCode": "06",
        "provCode": "0606"
    },
    {
        "id": 78,
        "psgcCode": "148100000",
        "provDesc": "Apayao",
        "regCode": "14",
        "provCode": "1481"
    },
    {
        "id": 16,
        "psgcCode": "037700000",
        "provDesc": "Aurora",
        "regCode": "03",
        "provCode": "0377"
    },
    {
        "id": 79,
        "psgcCode": "150700000",
        "provDesc": "Basilan",
        "regCode": "15",
        "provCode": "1507"
    },
    {
        "id": 17,
        "psgcCode": "041000000",
        "provDesc": "Batangas",
        "regCode": "04",
        "provCode": "0410"
    },
    {
        "id": 74,
        "psgcCode": "141100000",
        "provDesc": "Benguet",
        "regCode": "14",
        "provCode": "1411"
    },
    {
        "id": 48,
        "psgcCode": "087800000",
        "provDesc": "Biliran",
        "regCode": "08",
        "provCode": "0878"
    },
    {
        "id": 39,
        "psgcCode": "071200000",
        "provDesc": "Bohol",
        "regCode": "07",
        "provCode": "0712"
    },
    {
        "id": 53,
        "psgcCode": "101300000",
        "provDesc": "Bukidnon",
        "regCode": "10",
        "provCode": "1013"
    },
    {
        "id": 10,
        "psgcCode": "030800000",
        "provDesc": "Bataan",
        "regCode": "03",
        "provCode": "0308"
    },
    {
        "id": 5,
        "psgcCode": "020900000",
        "provDesc": "Batanes",
        "regCode": "02",
        "provCode": "0209"
    },
    {
        "id": 11,
        "psgcCode": "031400000",
        "provDesc": "Bulacan",
        "regCode": "03",
        "provCode": "0314"
    },
    {
        "id": 28,
        "psgcCode": "051600000",
        "provDesc": "Camarines Norte",
        "regCode": "05",
        "provCode": "0516"
    },
    {
        "id": 29,
        "psgcCode": "051700000",
        "provDesc": "Camarines Sur",
        "regCode": "05",
        "provCode": "0517"
    },
    {
        "id": 54,
        "psgcCode": "101800000",
        "provDesc": "Camiguin",
        "regCode": "10",
        "provCode": "1018"
    },
    {
        "id": 35,
        "psgcCode": "061900000",
        "provDesc": "Capiz",
        "regCode": "06",
        "provCode": "0619"
    },
    {
        "id": 30,
        "psgcCode": "052000000",
        "provDesc": "Catanduanes",
        "regCode": "05",
        "provCode": "0520"
    },
    {
        "id": 18,
        "psgcCode": "042100000",
        "provDesc": "Cavite",
        "regCode": "04",
        "provCode": "0421"
    },
    {
        "id": 40,
        "psgcCode": "072200000",
        "provDesc": "Cebu",
        "regCode": "07",
        "provCode": "0722"
    },
    {
        "id": 52,
        "psgcCode": "099700000",
        "provDesc": "City Of Isabela",
        "regCode": "09",
        "provCode": "0997"
    },
    {
        "id": 69,
        "psgcCode": "133900000",
        "provDesc": "City Of Manila",
        "regCode": "13",
        "provCode": "1339"
    },
    {
        "id": 61,
        "psgcCode": "118200000",
        "provDesc": "Compostela Valley",
        "regCode": "11",
        "provCode": "1182"
    },
    {
        "id": 63,
        "psgcCode": "124700000",
        "provDesc": "Cotabato (North Cotabato)",
        "regCode": "12",
        "provCode": "1247"
    },
    {
        "id": 67,
        "psgcCode": "129800000",
        "provDesc": "Cotabato City",
        "regCode": "12",
        "provCode": "1298"
    },
    {
        "id": 6,
        "psgcCode": "021500000",
        "provDesc": "Cagayan",
        "regCode": "02",
        "provCode": "0215"
    },
    {
        "id": 58,
        "psgcCode": "112300000",
        "provDesc": "Davao Del Norte",
        "regCode": "11",
        "provCode": "1123"
    },
    {
        "id": 59,
        "psgcCode": "112400000",
        "provDesc": "Davao Del Sur",
        "regCode": "11",
        "provCode": "1124"
    },
    {
        "id": 62,
        "psgcCode": "118600000",
        "provDesc": "Davao Occidental",
        "regCode": "11",
        "provCode": "1186"
    },
    {
        "id": 60,
        "psgcCode": "112500000",
        "provDesc": "Davao Oriental",
        "regCode": "11",
        "provCode": "1125"
    },
    {
        "id": 88,
        "psgcCode": "168500000",
        "provDesc": "Dinagat Islands",
        "regCode": "16",
        "provCode": "1685"
    },
    {
        "id": 43,
        "psgcCode": "082600000",
        "provDesc": "Eastern Samar",
        "regCode": "08",
        "provCode": "0826"
    },
    {
        "id": 38,
        "psgcCode": "067900000",
        "provDesc": "Guimaras",
        "regCode": "06",
        "provCode": "0679"
    },
    {
        "id": 75,
        "psgcCode": "142700000",
        "provDesc": "Ifugao",
        "regCode": "14",
        "provCode": "1427"
    },
    {
        "id": 36,
        "psgcCode": "063000000",
        "provDesc": "Iloilo",
        "regCode": "06",
        "provCode": "0630"
    },
    {
        "id": 1,
        "psgcCode": "012800000",
        "provDesc": "Ilocos Norte",
        "regCode": "01",
        "provCode": "0128"
    },
    {
        "id": 2,
        "psgcCode": "012900000",
        "provDesc": "Ilocos Sur",
        "regCode": "01",
        "provCode": "0129"
    },
    {
        "id": 7,
        "psgcCode": "023100000",
        "provDesc": "Isabela",
        "regCode": "02",
        "provCode": "0231"
    },
    {
        "id": 76,
        "psgcCode": "143200000",
        "provDesc": "Kalinga",
        "regCode": "14",
        "provCode": "1432"
    },
    {
        "id": 19,
        "psgcCode": "043400000",
        "provDesc": "Laguna",
        "regCode": "04",
        "provCode": "0434"
    },
    {
        "id": 55,
        "psgcCode": "103500000",
        "provDesc": "Lanao Del Norte",
        "regCode": "10",
        "provCode": "1035"
    },
    {
        "id": 80,
        "psgcCode": "153600000",
        "provDesc": "Lanao Del Sur",
        "regCode": "15",
        "provCode": "1536"
    },
    {
        "id": 44,
        "psgcCode": "083700000",
        "provDesc": "Leyte",
        "regCode": "08",
        "provCode": "0837"
    },
    {
        "id": 3,
        "psgcCode": "013300000",
        "provDesc": "La Union",
        "regCode": "01",
        "provCode": "0133"
    },
    {
        "id": 81,
        "psgcCode": "153800000",
        "provDesc": "Maguindanao",
        "regCode": "15",
        "provCode": "1538"
    },
    {
        "id": 22,
        "psgcCode": "174000000",
        "provDesc": "Marinduque",
        "regCode": "17",
        "provCode": "1740"
    },
    {
        "id": 31,
        "psgcCode": "054100000",
        "provDesc": "Masbate",
        "regCode": "05",
        "provCode": "0541"
    },
    {
        "id": 56,
        "psgcCode": "104200000",
        "provDesc": "Misamis Occidental",
        "regCode": "10",
        "provCode": "1042"
    },
    {
        "id": 57,
        "psgcCode": "104300000",
        "provDesc": "Misamis Oriental",
        "regCode": "10",
        "provCode": "1043"
    },
    {
        "id": 77,
        "psgcCode": "144400000",
        "provDesc": "Mountain Province",
        "regCode": "14",
        "provCode": "1444"
    },
    {
        "id": 68,
        "psgcCode": "133900000",
        "provDesc": "Ncr, City Of Manila, First District",
        "regCode": "13",
        "provCode": "1339"
    },
    {
        "id": 72,
        "psgcCode": "137600000",
        "provDesc": "Ncr, Fourth District",
        "regCode": "13",
        "provCode": "1376"
    },
    {
        "id": 70,
        "psgcCode": "137400000",
        "provDesc": "Ncr, Second District",
        "regCode": "13",
        "provCode": "1374"
    },
    {
        "id": 71,
        "psgcCode": "137500000",
        "provDesc": "Ncr, Third District",
        "regCode": "13",
        "provCode": "1375"
    },
    {
        "id": 37,
        "psgcCode": "064500000",
        "provDesc": "Negros Occidental",
        "regCode": "06",
        "provCode": "0645"
    },
    {
        "id": 41,
        "psgcCode": "074600000",
        "provDesc": "Negros Oriental",
        "regCode": "07",
        "provCode": "0746"
    },
    {
        "id": 45,
        "psgcCode": "084800000",
        "provDesc": "Northern Samar",
        "regCode": "08",
        "provCode": "0848"
    },
    {
        "id": 12,
        "psgcCode": "034900000",
        "provDesc": "Nueva Ecija",
        "regCode": "03",
        "provCode": "0349"
    },
    {
        "id": 8,
        "psgcCode": "025000000",
        "provDesc": "Nueva Vizcaya",
        "regCode": "02",
        "provCode": "0250"
    },
    {
        "id": 23,
        "psgcCode": "175100000",
        "provDesc": "Occidental Mindoro",
        "regCode": "17",
        "provCode": "1751"
    },
    {
        "id": 24,
        "psgcCode": "175200000",
        "provDesc": "Oriental Mindoro",
        "regCode": "17",
        "provCode": "1752"
    },
    {
        "id": 25,
        "psgcCode": "175300000",
        "provDesc": "Palawan",
        "regCode": "17",
        "provCode": "1753"
    },
    {
        "id": 13,
        "psgcCode": "035400000",
        "provDesc": "Pampanga",
        "regCode": "03",
        "provCode": "0354"
    },
    {
        "id": 4,
        "psgcCode": "015500000",
        "provDesc": "Pangasinan",
        "regCode": "01",
        "provCode": "0155"
    },
    {
        "id": 20,
        "psgcCode": "045600000",
        "provDesc": "Quezon",
        "regCode": "04",
        "provCode": "0456"
    },
    {
        "id": 9,
        "psgcCode": "025700000",
        "provDesc": "Quirino",
        "regCode": "02",
        "provCode": "0257"
    },
    {
        "id": 21,
        "psgcCode": "045800000",
        "provDesc": "Rizal",
        "regCode": "04",
        "provCode": "0458"
    },
    {
        "id": 26,
        "psgcCode": "175900000",
        "provDesc": "Romblon",
        "regCode": "17",
        "provCode": "1759"
    },
    {
        "id": 46,
        "psgcCode": "086000000",
        "provDesc": "Samar (Western Samar)",
        "regCode": "08",
        "provCode": "0860"
    },
    {
        "id": 66,
        "psgcCode": "128000000",
        "provDesc": "Sarangani",
        "regCode": "12",
        "provCode": "1280"
    },
    {
        "id": 42,
        "psgcCode": "076100000",
        "provDesc": "Siquijor",
        "regCode": "07",
        "provCode": "0761"
    },
    {
        "id": 32,
        "psgcCode": "056200000",
        "provDesc": "Sorsogon",
        "regCode": "05",
        "provCode": "0562"
    },
    {
        "id": 64,
        "psgcCode": "126300000",
        "provDesc": "South Cotabato",
        "regCode": "12",
        "provCode": "1263"
    },
    {
        "id": 47,
        "psgcCode": "086400000",
        "provDesc": "Southern Leyte",
        "regCode": "08",
        "provCode": "0864"
    },
    {
        "id": 65,
        "psgcCode": "126500000",
        "provDesc": "Sultan Kudarat",
        "regCode": "12",
        "provCode": "1265"
    },
    {
        "id": 82,
        "psgcCode": "156600000",
        "provDesc": "Sulu",
        "regCode": "15",
        "provCode": "1566"
    },
    {
        "id": 86,
        "psgcCode": "166700000",
        "provDesc": "Surigao Del Norte",
        "regCode": "16",
        "provCode": "1667"
    },
    {
        "id": 87,
        "psgcCode": "166800000",
        "provDesc": "Surigao Del Sur",
        "regCode": "16",
        "provCode": "1668"
    },
    {
        "id": 14,
        "psgcCode": "036900000",
        "provDesc": "Tarlac",
        "regCode": "03",
        "provCode": "0369"
    },
    {
        "id": 83,
        "psgcCode": "157000000",
        "provDesc": "Tawi-Tawi",
        "regCode": "15",
        "provCode": "1570"
    },
    {
        "id": 15,
        "psgcCode": "037100000",
        "provDesc": "Zambales",
        "regCode": "03",
        "provCode": "0371"
    },
    {
        "id": 49,
        "psgcCode": "097200000",
        "provDesc": "Zamboanga Del Norte",
        "regCode": "09",
        "provCode": "0972"
    },
    {
        "id": 50,
        "psgcCode": "097300000",
        "provDesc": "Zamboanga Del Sur",
        "regCode": "09",
        "provCode": "0973"
    },
    {
        "id": 51,
        "psgcCode": "098300000",
        "provDesc": "Zamboanga Sibugay",
        "regCode": "09",
        "provCode": "0983"
    }
];

module.exports = lodash.sortBy(provinces, o => o.provDesc);