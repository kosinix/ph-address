/**
 * Usage
 * 
 * node test/find-sqlite.test.js
 */
//// Core modules


//// External modules


//// Modules
const phAddress = require('../index').useSqlite()

    ;
(async () => {
    try {
        const db = await phAddress.connect()
        let addresses = await db.find('mclain')
        console.log(addresses)

        addresses = await db.find('brgy 163')
        console.log(addresses)

    } catch (error) {
        console.error(error)
    }
})()



