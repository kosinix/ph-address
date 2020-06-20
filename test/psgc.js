const csv = require('csv-parser')
const fs = require('fs')

let phAddresses = [];

fs.createReadStream('./data/psgc.csv', {encoding: 'utf8'})
    .pipe(csv({}))
    .on('data', (data) => {
        let code = data['Code']
        let name = data['Name']
        let level = data['Geographic Level']
        let cityMunCode = code.substr(0, 6)
        let provCode = code.substr(0, 4)
        let regCode = code.substr(0, 2)

        phAddresses.push({
            code: code,
            name: name,
            level: level,
            regCode: regCode,
            provCode: provCode,
            cityMunCode: cityMunCode,
        })
        // if(data['Geographic Level'] === 'Bgy'){
        //     barangays.push({
        //         psgcCode: code,
        //         brgyDesc: name,
        //         cityMunCode: cityMunCode,
        //         provCode: provCode,
        //         regCode: regCode,
        //     })
        // } else if(data['Geographic Level'] === 'City' || data['Geographic Level'] === 'Mun'){
        //     cityMuns.push({
        //         psgcCode: code,
        //         cityMunDesc: name,
        //         cityMunCode: cityMunCode,
        //         provCode: provCode,
        //         regCode: regCode,
        //     })
        // } else if(data['Geographic Level'] === 'City' || data['Geographic Level'] === 'Mun'){
        //     cityMuns.push({
        //         psgcCode: code,
        //         cityMunDesc: name,
        //         cityMunCode: cityMunCode,
        //         provCode: provCode,
        //         regCode: regCode,
        //     })
        // }
    })
    .on('end', () => {
        // console.log(barangays.length);
        // console.log(cityMuns.length);
        fs.writeFileSync('./data/ph-addresses.json', JSON.stringify(phAddresses), { encoding:'utf8'})
        // fs.writeFileSync('./data/barangays.json', JSON.stringify(barangays), { encoding:'utf8'})
    });