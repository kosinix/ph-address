//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
let citiesMuns = [
    {
        "id": 1350,
        "psgcCode": "133901000",
        "citymunDesc": "Tondo I / II",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133901"
    },
    {
        "id": 1351,
        "psgcCode": "133902000",
        "citymunDesc": "Binondo",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133902"
    },
    {
        "id": 1352,
        "psgcCode": "133903000",
        "citymunDesc": "Quiapo",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133903"
    },
    {
        "id": 1353,
        "psgcCode": "133904000",
        "citymunDesc": "San Nicolas",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133904"
    },
    {
        "id": 1354,
        "psgcCode": "133905000",
        "citymunDesc": "Santa Cruz",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133905"
    },
    {
        "id": 1355,
        "psgcCode": "133906000",
        "citymunDesc": "Sampaloc",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133906"
    },
    {
        "id": 1356,
        "psgcCode": "133907000",
        "citymunDesc": "San Miguel",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133907"
    },
    {
        "id": 1357,
        "psgcCode": "133908000",
        "citymunDesc": "Ermita",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133908"
    },
    {
        "id": 1358,
        "psgcCode": "133909000",
        "citymunDesc": "Intramuros",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133909"
    },
    {
        "id": 1359,
        "psgcCode": "133910000",
        "citymunDesc": "Malate",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133910"
    },
    {
        "id": 1360,
        "psgcCode": "133911000",
        "citymunDesc": "Paco",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133911"
    },
    {
        "id": 1361,
        "psgcCode": "133912000",
        "citymunDesc": "Pandacan",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133912"
    },
    {
        "id": 1362,
        "psgcCode": "133913000",
        "citymunDesc": "Port Area",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133913"
    },
    {
        "id": 1363,
        "psgcCode": "133914000",
        "citymunDesc": "Santa Ana",
        "regDesc": "13",
        "provCode": "1339",
        "citymunCode": "133914"
    },
    {
        "id": 1364,
        "psgcCode": "137401000",
        "citymunDesc": "City Of Mandaluyong",
        "regDesc": "13",
        "provCode": "1374",
        "citymunCode": "137401"
    },
    {
        "id": 1365,
        "psgcCode": "137402000",
        "citymunDesc": "City Of Marikina",
        "regDesc": "13",
        "provCode": "1374",
        "citymunCode": "137402"
    },
    {
        "id": 1366,
        "psgcCode": "137403000",
        "citymunDesc": "City Of Pasig",
        "regDesc": "13",
        "provCode": "1374",
        "citymunCode": "137403"
    },
    {
        "id": 1367,
        "psgcCode": "137404000",
        "citymunDesc": "Quezon City",
        "regDesc": "13",
        "provCode": "1374",
        "citymunCode": "137404"
    },
    {
        "id": 1368,
        "psgcCode": "137405000",
        "citymunDesc": "City Of San Juan",
        "regDesc": "13",
        "provCode": "1374",
        "citymunCode": "137405"
    },
    {
        "id": 1369,
        "psgcCode": "137501000",
        "citymunDesc": "Caloocan City",
        "regDesc": "13",
        "provCode": "1375",
        "citymunCode": "137501"
    },
    {
        "id": 1370,
        "psgcCode": "137502000",
        "citymunDesc": "City Of Malabon",
        "regDesc": "13",
        "provCode": "1375",
        "citymunCode": "137502"
    },
    {
        "id": 1371,
        "psgcCode": "137503000",
        "citymunDesc": "City Of Navotas",
        "regDesc": "13",
        "provCode": "1375",
        "citymunCode": "137503"
    },
    {
        "id": 1372,
        "psgcCode": "137504000",
        "citymunDesc": "City Of Valenzuela",
        "regDesc": "13",
        "provCode": "1375",
        "citymunCode": "137504"
    },
    {
        "id": 1373,
        "psgcCode": "137601000",
        "citymunDesc": "City Of Las Piñas",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137601"
    },
    {
        "id": 1374,
        "psgcCode": "137602000",
        "citymunDesc": "City Of Makati",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137602"
    },
    {
        "id": 1375,
        "psgcCode": "137603000",
        "citymunDesc": "City Of Muntinlupa",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137603"
    },
    {
        "id": 1376,
        "psgcCode": "137604000",
        "citymunDesc": "City Of Parañaque",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137604"
    },
    {
        "id": 1377,
        "psgcCode": "137605000",
        "citymunDesc": "Pasay City",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137605"
    },
    {
        "id": 1378,
        "psgcCode": "137606000",
        "citymunDesc": "Pateros",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137606"
    },
    {
        "id": 1379,
        "psgcCode": "137607000",
        "citymunDesc": "Taguig City",
        "regDesc": "13",
        "provCode": "1376",
        "citymunCode": "137607"
    }
];

module.exports = lodash.sortBy(citiesMuns, o => o.citymunDesc);