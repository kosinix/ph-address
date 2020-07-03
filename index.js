//// Core modules

//// External modules
const lodash = require('lodash');

//// Modules
const regions = require('./regions');
const provinces = require('./provinces');
const citiesMuns = require('./cities-muns');
const citiesNcr = require('./cities-ncr');
const barangays = require('./barangays');
const groupedProvincesByRegion = lodash.groupBy(provinces, (o) => {
    return o.regCode;
});
const groupedCitiesMunsByProvince = lodash.groupBy(citiesMuns, (o) => {
    return o.provCode;
});
const groupedBarangaysByCitiesMuns = lodash.groupBy(barangays, (o) => {
    return o.cityMunCode;
});

const find = (search)=>{
    try{

        let keys = search.split(',')
        keys = lodash.map(keys, (o) => {
            o = lodash.trim(o)
            o = o.replace(/(brgy\.)|(brgy)/, 'Barangay')
            return new RegExp(o, "i")

        })

        // Our address returned starts from bgy level
        let query = {
            level: 'Bgy'
        }
        if(keys.length === 0){

        }
        if(keys.length === 1){
            query = {
                $or: [
                    {
                        $and: [
                            {name: keys[0]},
                            {level: 'Bgy'},
                        ]
                    },
                    {
                        $and: [
                            {cityMunName: keys[0]},
                            {level: 'Bgy'},
                        ]
                    },
                    {
                        $and: [
                            {provName: keys[0]},
                            {level: 'Bgy'},
                        ]
                    }
                ]
            }

        } else if (keys.length === 2){
            query = {
                $or: [
                    {
                        $and: [
                            {name: keys[0]},
                            {level: 'Bgy'},
                            {cityMunName: keys[1]}
                        ],
                    },
                    {
                        $and: [

                            {level: 'Bgy'},
                            {cityMunName: keys[0]},
                            {provName: keys[1]}
                        ],
                    },
                ]
            }
        } else {
            query = {
                $or: [
                    {
                        $and: [
                            {name: keys[0]},
                            {level: 'Bgy'},
                            {cityMunName: keys[1]},
                            {provName: keys[2]},
                        ],
                    },
                    {
                        $and: [
                            {name: keys[0]},
                            {level: 'Bgy'},
                            {cityMunName: keys[1]},
                        ],
                    },
                ]
            }
        }
        console.log(util.inspect(query, false, null, true /* enable colors */))
        // raw ops
        let addresses = await db.main.Address.collection.find(query).limit(10).toArray()
        addresses = lodash.map(addresses, (o)=>{
            let full = [o.name]
            if(o.cityMunName){
                full.push(o.cityMunName)
            }
            if(o.provName){
                full.push(o.provName)
            }
            return full.join(', ')
        })
        return res.send(addresses)
    } catch (err){
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