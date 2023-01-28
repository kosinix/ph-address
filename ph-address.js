//// Core modules
const path = require('path')

//// External modules
const { Sequelize, Op } = require('sequelize');
const PhAddressFinder = require('./ph-address-finder');

//// Modules

const APP_DIR = path.resolve(__dirname).replace(/\\/g, '/')

class PhAddress {
    #sequelize
    #Address;
    constructor() { }
    
    /**
     * Create instance that uses sqlite3 database
     * 
     * @param {String} storage Optional path to database
     * @returns {Promise<PhAddressFinder>}
     */
    async useSqlite(storage = '') {
        if (!storage) {
            storage = path.join(APP_DIR, 'sqlite/ph-addresses.db')
        }
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: storage,
            logging: false,
        });

        await sequelize.authenticate()
        const Address = require('./sqlite/models/address')('Address', sequelize)

        this.#sequelize = sequelize
        this.#Address = Address
        return new PhAddressFinder(sequelize, Address)
    }
}

module.exports = PhAddress