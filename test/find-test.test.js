const phAddress = require('../index')


phAddress.find('buenavista, guimar').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.error(err)
})

setTimeout(()=>{}, 10000)