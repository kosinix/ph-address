//// Core modules
const path = require('path')


//// External modules
const { Sequelize, QueryTypes } = require('sequelize');

const APP_DIR = path.resolve(__dirname).replace(/\\/g, '/')


//// Modules


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(APP_DIR, 'data/ph-addresses.db'),
    logging: false
});

module.exports = {
    find: async (search, limit = 10) => {
        try {

            await sequelize.authenticate();

            let keys = search.split(',')
            keys = keys.map((o) => {
                o = o.trim()
                o = o.replace(/(brgy\.)|(brgy)/, 'Barangay') // Expand abbreviation
                return `%${o}%`
            })

            // Our address returned starts from bgy level
            let query = ` level = 'Bgy' `

            if (keys.length === 1) {

                query = ` (name LIKE "${keys[0]}" AND level = 'Bgy') `
                query += ` OR (cityMunName LIKE "${keys[0]}" AND level = 'Bgy') `
                query += ` OR (provName LIKE "${keys[0]}" AND level = 'Bgy') `

                if (keys[0].match(/([\w]+ city)/i)) {
                    let custom = keys[0].replace(/ city/i, '')
                    custom = `City of ${custom}`
                    query += ` OR (cityMunName LIKE "${custom}" AND level = 'Bgy') `
                }

            } else if (keys.length === 2) {

                query = ` (name LIKE "${keys[0]}" AND cityMunName LIKE "${keys[1]}" AND level = 'Bgy') `
                query += ` OR (cityMunName LIKE "${keys[0]}" AND provName LIKE "${keys[1]}" AND level = 'Bgy') `

            } else {

                query = ` (name LIKE "${keys[0]}" AND cityMunName LIKE "${keys[1]}" AND provName LIKE "${keys[2]}" AND level = 'Bgy') `
                query += ` OR (name LIKE "${keys[0]}" AND cityMunName LIKE "${keys[1]}" AND level = 'Bgy') `

            }
            // console.log(util.inspect(query, false, null, true /* enable colors */))
            let addresses = await sequelize.query("SELECT * FROM `addresses` WHERE " + query + " LIMIT " + limit, { type: QueryTypes.SELECT });

            addresses = addresses.map((o) => {
                return {
                    id: o.code,
                    name: o.full
                }
            })

            return addresses

        } catch (err) {
            throw err
        }
    }
}