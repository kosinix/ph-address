/**
 * Usage
 * 
 * node test/find-mongo.test.js
 */
//// Core modules


//// External modules
const {MongoClient} = require('mongodb');


//// Modules
const CRED = require('../credentials.json')
let cred = CRED.mongodb.connections.main
const phAddress = require('../index').useMongo()

let client = new MongoClient(`mongodb://${cred.username}:${cred.password}@localhost/psgc`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
client.connect().then(()=>{
    phAddress.find(client, 'psgc', 'phaddresses', 'buenavista, guimar').then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.error(err)
    }).finally(()=>{
        client.close()
    })
})


