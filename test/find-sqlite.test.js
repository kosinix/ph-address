/**
 * Usage
 * 
 * node test/find-sqlite.test.js
 */
//// Core modules


//// External modules


//// Modules
const { PhAddress } = require('../index')

    ;
(async () => {
    try {
        const phAddress = new PhAddress()
        const addressFinder = await phAddress.useSqlite()
        let addresses = await addressFinder.find('brgy 163')
        console.log(addresses)


    } catch (error) {
        console.error(error)
    }
})()



