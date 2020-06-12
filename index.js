//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
const regions = require('./regions');
const provinces = require('./provinces');
const citiesMuns = require('./cities-muns');
const citiesNcr = require('./cities-ncr');
const groupedProvincesByRegion = lodash.groupBy(provinces, (o) => {
    return o.regCode;
});
const groupedCitiesMunsByProvince = lodash.groupBy(citiesMuns, (o) => {
    return o.provCode;
});

module.exports = {
    regions: regions,
    provinces: provinces,
    citiesMuns: citiesMuns,
    citiesNcr: citiesNcr,
    groupedProvincesByRegion: groupedProvincesByRegion,
    groupedCitiesMunsByProvince: groupedCitiesMunsByProvince,
}