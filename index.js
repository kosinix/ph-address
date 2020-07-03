//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
const regions = require('./regions');
const provinces = require('./provinces');
const citiesMuns = require('./cities-muns');
const citiesNcr = require('./cities-ncr');
const barangays = require('./barangays');
const phAddresses = require('./data/ph-addresses.json');
const groupedProvincesByRegion = lodash.groupBy(provinces, (o) => {
    return o.regCode;
});
const groupedCitiesMunsByProvince = lodash.groupBy(citiesMuns, (o) => {
    return o.provCode;
});
const groupedBarangaysByCitiesMuns = lodash.groupBy(barangays, (o) => {
    return o.cityMunCode;
});

const find = (search, limit = 10) => {
    try {
        let keys = search.split(',')
        keys = lodash.map(keys, (o) => {
            o = lodash.trim(o)
            o = o.replace(/(brgy\.)|(brgy)/, 'Barangay') // Expand abbreviation
            return new RegExp(o, "i")
        })

        let addresses = []
        if (keys.length === 0) {
            let found1 = lodash.filter(phAddresses, (o) => {
                return o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
        } else if (keys.length === 1) {
            let found1 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'cityMunName', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)
            let found3 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'provName', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found3)

            if (keys[0].source.match(/([\w]+ city)/i)) {
                let custom = keys[0].source.replace(/ city/i, '')
                custom = `City of ${custom}`
                let found4 = lodash.filter(phAddresses, (o) => {
                    return lodash.get(o, 'cityMunName', '').match(new RegExp(custom, 'i')) && o.level === 'Bgy'
                })
                addresses = addresses.concat(found4)
            }
        } else if (keys.length === 2) {
            let found1 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'cityMunName', '').match(keys[0]) && lodash.get(o, 'provName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)

        } else {

            let found1 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && lodash.get(o, 'provName', '').match(keys[2]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = lodash.filter(phAddresses, (o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)

        }
        if (limit > -1) {
            addresses = addresses.slice(0, limit)
        }
        return lodash.map(addresses, (o) => {
            let full = [o.name]
            if (o.cityMunName) {
                full.push(o.cityMunName)
            }
            if (o.provName) {
                full.push(o.provName)
            }
            return {
                id: o.code,
                name: full.join(', ')
            }
        })
    } catch (err) {
        throw  err
    }
}

module.exports = {
    regions: regions,
    provinces: provinces,
    citiesMuns: citiesMuns,
    citiesNcr: citiesNcr,
    barangays: barangays,
    groupedProvincesByRegion: groupedProvincesByRegion,
    groupedCitiesMunsByProvince: groupedCitiesMunsByProvince,
    groupedBarangaysByCitiesMuns: groupedBarangaysByCitiesMuns,
    find: find
}