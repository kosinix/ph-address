//// Core modules
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)

//// External modules
const get = require('lodash.get');
const lodash = {
    get: get
}

//// Modules
let phAddressesFileDataPromise = readFileAsync('./data/ph-addresses.json', {encoding: 'utf8'})
let phAddresses = null

const find = async (search, limit = 10) => {
    try {
        if(!phAddresses){
            let phAddressesFileData = await phAddressesFileDataPromise
            phAddresses = JSON.parse(phAddressesFileData)
        }
        let keys = search.split(',')
        keys = keys.map((o) => {
            o = o.trim()
            o = o.replace(/(brgy\.)|(brgy)/, 'Barangay') // Expand abbreviation
            return new RegExp(o, "i")
        })

        let addresses = []
        if (keys.length === 0) {
            let found1 = phAddresses.filter((o) => {
                return o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
        } else if (keys.length === 1) {
            let found1 = phAddresses.filter((o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = phAddresses.filter((o) => {
                return lodash.get(o, 'cityMunName', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)
            let found3 = phAddresses.filter((o) => {
                return lodash.get(o, 'provName', '').match(keys[0]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found3)

            if (keys[0].source.match(/([\w]+ city)/i)) {
                let custom = keys[0].source.replace(/ city/i, '')
                custom = `City of ${custom}`
                let found4 = phAddresses.filter((o) => {
                    return lodash.get(o, 'cityMunName', '').match(new RegExp(custom, 'i')) && o.level === 'Bgy'
                })
                addresses = addresses.concat(found4)
            }
        } else if (keys.length === 2) {
            let found1 = phAddresses.filter((o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = phAddresses.filter((o) => {
                return lodash.get(o, 'cityMunName', '').match(keys[0]) && lodash.get(o, 'provName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)

        } else {

            let found1 = phAddresses.filter((o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && lodash.get(o, 'provName', '').match(keys[2]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found1)
            let found2 = phAddresses.filter((o) => {
                return lodash.get(o, 'name', '').match(keys[0]) && lodash.get(o, 'cityMunName', '').match(keys[1]) && o.level === 'Bgy'
            })
            addresses = addresses.concat(found2)

        }
        if (limit > -1) {
            addresses = addresses.slice(0, limit)
        }
        return addresses.map((o) => {
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
    find: find
}