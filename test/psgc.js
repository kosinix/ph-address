const csv = require('csv-parser')
const fs = require('fs')
const lodash = require('lodash')

let phAddresses = [];
let provinces = [];
let cityMuns = [];

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

fs.createReadStream('./data/psgc.csv', {encoding: 'utf8'})
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

        if (level === 'City' || level === 'Mun') {
            name = toTitleCase(name)
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
        })

    })
    .on('end', () => {
        phAddresses = lodash.map(phAddresses, (a) => {
            if(a.level === 'Bgy') {
                // Get barangay municipality or city
                let found = lodash.find(cityMuns, (f) => {
                    return f.code === `${a.cityMunCode}000`
                })
                a.cityMunName = lodash.get(found, 'name')
            }

            if(a.level === 'Bgy' || a.level === 'City' || a.level === 'Mun') {
                // Get province
                found = lodash.find(provinces, (f) => {
                    return f.code === `${a.provCode}00000`
                })
                a.provName = lodash.get(found, 'name')
            }

            return a
        })
        // console.log(barangays.length);
        // console.log(cityMuns.length);
        fs.writeFileSync('./data/ph-addresses.json', JSON.stringify(phAddresses), {encoding: 'utf8'})
        // fs.writeFileSync('./data/barangays.json', JSON.stringify(barangays), { encoding:'utf8'})
    });