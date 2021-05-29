/**
 * Converts data/psgc.csv into data/ph-addresses.json
 *
 * Run: node scripts/psgc-to-json.js
 * 
 * To import to mongodb: 
 *  mongoimport --uri="mongodb://[username]:[password]@127.0.0.1:27017/[db]?authSource=[authDb]" --collection=addresses --file=[path to /ph-address/data/ph-addresses.json] --jsonArray --drop
 * */

const csv = require('csv-parser')
const fs = require('fs')
const lodashGet = require('lodash.get')
const lodash = {
    get: lodashGet
}

let phAddresses = [];
let provinces = [];
let cityMuns = [];

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

fs.createReadStream('./data/psgc.csv', { encoding: 'utf8' })
    .pipe(csv({}))
    .on('data', (data) => {
        let code = data['Code']
        let name = data['Name']
        let level = data['Geographic Level']
        let cityMunCode = code.substr(0, 6)
        let provCode = code.substr(0, 4)
        let regCode = code.substr(0, 2)

        if (level === 'Prov') {
            name = toTitleCase(name)
            provinces.push({
                code: code,
                name: name,
                level: level,
                regCode: regCode,
                provCode: provCode,
                cityMunCode: cityMunCode,
            })
        }

        // Districts exist only in NCR. Same level as province but not a province.
        if (level === 'Dist') {
            name = toTitleCase(name)
            name = name.replace('Ncr', 'NCR')
            name = name.replace(' (Not A Province)', '')
            provinces.push({
                code: code,
                name: name,
                level: level,
                regCode: regCode,
                provCode: provCode,
                cityMunCode: cityMunCode,
            })
        }

        // SubMuns exists only in the City of Manila. Its the same level as a municipality but not a municipality (because its a sub municipality wtf) :-|
        if (level === 'City' || level === 'Mun' || level === 'SubMun') {
            name = toTitleCase(name)
            if (level === 'SubMun') {
                name = name.replace('Tondo I/ii', 'Tondo I/II')
            }
            if (level === 'City') {
                name = name.replace('(Capital)', '')
                if (name.match(/City of/i)) {
                    name = name + ' (City)'
                }
            }
            cityMuns.push({
                code: code,
                name: name,
                level: level,
                regCode: regCode,
                provCode: provCode,
                cityMunCode: cityMunCode,
            })
        }

        phAddresses.push({
            code: code,
            name: name,
            level: level,
            regCode: regCode,
            provCode: provCode,
            cityMunCode: cityMunCode,
            provName: '',
            cityMunName: '',
            full: name,
        })

    })
    .on('end', () => {
        phAddresses = phAddresses.map((a) => {
            if (a.level === 'Bgy') {
                // Get barangay municipality or city
                let found = cityMuns.find((f) => {
                    return f.code === `${a.cityMunCode}000`
                })
                a.cityMunName = lodash.get(found, 'name')
                if (a.cityMunName) {
                    a.full += ', ' + a.cityMunName
                }
            }

            if (a.level === 'Bgy' || a.level === 'City' || a.level === 'Mun' || a.level === 'SubMun') {
                // Get province
                found = provinces.find((f) => {
                    return f.code === `${a.provCode}00000`
                })
                a.provName = lodash.get(found, 'name')
                if (a.provName) {
                    a.full += ', ' + a.provName
                }
            }

            return a
        })
        // console.log(barangays.length);
        // console.log(cityMuns.length);
        fs.writeFileSync('./data/ph-addresses.json', JSON.stringify(phAddresses), { encoding: 'utf8' })
        // fs.writeFileSync('./data/barangays.json', JSON.stringify(barangays), { encoding:'utf8'})
    });