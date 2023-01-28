//// Core modules
const path = require('path')

//// External modules
const { Op } = require('sequelize');

//// Modules


class PhAddressFinder {
    #sequelize
    #Address;
    constructor(sequelize, Address) { 
        this.#sequelize = sequelize
        this.#Address = Address
    }
    async find(search, minChar = 3, limit = 50, formatter = null) {
        try {
            if(!this.#sequelize){
                throw new Error('Please use connect() first.')
            }
            let addresses = []

            if (search.length < minChar) {
                return addresses
            }

            let keys = search.split(',')
            keys = keys.map((o) => {
                o = o.trim()
                return o
            })

            if (keys.length === 1) {
                // Find all brgys that match or starts with keys[0]
                addresses = await this.#Address.findAll({
                    where: {
                        name: {
                            [Op.like]: keys[0],
                        },
                        level: 'Bgy',
                    },
                    raw: true,
                    order: ['name', 'cityMunName']
                })
                if (addresses.length <= 0) {
                    // Broader search criteria
                    let criteria = this.#expandNameCriteria(keys[0])
                    addresses = await this.#Address.findAll({
                        where: {
                            level: 'Bgy',
                            [Op.or]: criteria
                        },
                        limit: limit,
                        raw: true,
                        order: ['name', 'cityMunName']
                    })
                }
            } else if (keys.length === 2) {
                let criteria = this.#expandNameCriteria(keys[0])
                let where = {
                    [Op.or]: criteria,
                    cityMunName: {
                        [Op.or]: {
                            [Op.like]: keys[1],
                            [Op.like]: keys[1] + '%',
                        }
                    }
                }
                addresses = await this.#Address.findAll({
                    where: where,
                    limit: limit,
                    raw: true,
                    order: ['name', 'cityMunName']
                })

            } else {
                let criteria = this.#expandNameCriteria(keys[0])
                addresses = await this.#Address.findAll({
                    where: {
                        [Op.or]: criteria,
                        [Op.and]: [
                            {
                                cityMunName: {
                                    [Op.or]: {
                                        [Op.like]: keys[1],
                                    }
                                }
                            },
                            {
                                provName: {
                                    [Op.or]: {
                                        [Op.like]: keys[2],
                                        [Op.like]: keys[2] + '%',
                                    }
                                }
                            }
                        ]
                    },
                    limit: limit,
                    raw: true,
                    order: ['name', 'cityMunName']
                })
            }

            if (!formatter) {
                formatter = (a) => {
                    let full = []
                    if (a.name) full.push(a.name)
                    if (a.cityMunName) full.push(a.cityMunName)
                    if (a.provName && (a.provName !== a.cityMunName)) full.push(a.provName)
                    if (a.regName) full.push(a.regName)

                    return {
                        name: full.join(', '),
                        id: a.psgc
                    }
                }
            }
            return addresses.map(formatter)


        } catch (err) {
            throw err
        }
    }

    #expandNameCriteria (keyWords) {
        // Broader search criteria
        let criteria = [
            {
                name: {
                    [Op.like]: keyWords + '%',
                }
            }
        ]
        if (keyWords.match(/^(sto\.?)/i)) {
            criteria.push({
                name: {
                    [Op.like]: keyWords.replace(/^(sto\.?)/i, 'Santo') + '%',
                }
            })
        } else if (keyWords.match(/^(brgy\.?)/i)) {
            criteria.push({
                name: {
                    [Op.like]: keyWords.replace(/^(brgy\.?)/i, 'Barangay') + '%',
                }
            })
        }
        if (keyWords.match(/(nino)/i)) {
            criteria.push({
                name: {
                    [Op.like]: keyWords.replace(/(nino)/i, 'niño') + '%',
                }
            })
        }
        return criteria
    }
}

module.exports = PhAddressFinder