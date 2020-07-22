/**
 * Usage
 * 
 * node test/find-sqlite.test.js
 */
//// Core modules


//// External modules


//// Modules
const phAddress = require('../index').useSqlite()

phAddress.find('mclain').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.error(err)
}).finally(()=>{

})

phAddress.find('buenavista, guimar').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.error(err)
}).finally(()=>{

})


