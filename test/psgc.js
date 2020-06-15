const csv = require('csv-parser')
const fs = require('fs')

let cityMuns = [];
let barangays = [];

fs.createReadStream('./data/psgc.csv', {encoding: 'utf8'})
    .pipe(csv({}))
    .on('data', (data) => {
        let code = data['Code']
        let name = data['Name']
        let cityMunCode = code.substr(0, 6)
        let provCode = code.substr(0, 4)
        let regCode = code.substr(0, 2)
        if(data['Geographic Level'] === 'Bgy'){
            barangays.push({
                psgcCode: code,
                brgyDesc: name,
                cityMunCode: cityMunCode,
                provCode: provCode,
                regCode: regCode,
            })
        }
        if(data['Geographic Level'] === 'City' || data['Geographic Level'] === 'Mun'){
            cityMuns.push({
                psgcCode: code,
                cityMunDesc: name,
                cityMunCode: cityMunCode,
                provCode: provCode,
                regCode: regCode,
            })
        }
    })
    .on('end', () => {
        // console.log(barangays);
        fs.writeFileSync('./data/cities-muns.json', JSON.stringify(barangays), { encoding:'utf8'})
        fs.writeFileSync('./data/barangays.json', JSON.stringify(barangays), { encoding:'utf8'})
    });