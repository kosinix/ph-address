const phAddress = require('../index').useMemory()

phAddress.find('buenavista, guimar').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.error(err)
})

setTimeout(()=>{}, 5000)