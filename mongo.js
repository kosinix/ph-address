//// Core modules


//// External modules


//// Modules



module.exports = {
    find: async (client, dbName, collection, search, limit = 10) => {
        try {
            let keys = search.split(',')
            keys = keys.map((o) => {
                o = o.trim()
                o = o.replace(/(brgy\.)|(brgy)/, 'Barangay') // Expand abbreviation
                return new RegExp(o, "i")
            })

            // Our address returned starts from bgy level
            let query = {
                level: 'Bgy'
            }
            if(keys.length === 0){

            }
            if(keys.length === 1){

                query = {
                    $or: [
                        {
                            $and: [
                                {name: keys[0]},
                                {level: 'Bgy'},
                            ]
                        },
                        {
                            $and: [
                                {cityMunName: keys[0]},
                                {level: 'Bgy'},
                            ]
                        },
                        {
                            $and: [
                                {provName: keys[0]},
                                {level: 'Bgy'},
                            ]
                        }
                    ]
                }

                if(keys[0].source.match(/([\w]+ city)/i)){
                    let custom = keys[0].source.replace(/ city/i, '')
                    custom = `City of ${custom}`
                    query.$or.push({
                        $and: [
                            {cityMunName: new RegExp(custom, 'i')},
                            {level: 'Bgy'},
                        ]
                    })
                }

            } else if (keys.length === 2){
                query = {
                    $or: [
                        {
                            $and: [
                                {name: keys[0]},
                                {level: 'Bgy'},
                                {cityMunName: keys[1]}
                            ],
                        },
                        {
                            $and: [

                                {level: 'Bgy'},
                                {cityMunName: keys[0]},
                                {provName: keys[1]}
                            ],
                        },
                    ]
                }
            } else {
                query = {
                    $or: [
                        {
                            $and: [
                                {name: keys[0]},
                                {level: 'Bgy'},
                                {cityMunName: keys[1]},
                                {provName: keys[2]},
                            ],
                        },
                        {
                            $and: [
                                {name: keys[0]},
                                {level: 'Bgy'},
                                {cityMunName: keys[1]},
                            ],
                        },
                    ]
                }
            }
            // console.log(util.inspect(query, false, null, true /* enable colors */))
            // raw ops
            let addresses = await client.db(dbName).collection(collection).find(query).limit(10).toArray()
            addresses = addresses.map((o)=>{
                let full = [o.name]
                if(o.cityMunName){
                    full.push(o.cityMunName)
                }
                if(o.provName){
                    full.push(o.provName)
                }
                return {
                    id: o.code,
                    name: full.join(', ')
                }
            })

            return addresses

        } catch (err) {
            throw  err
        }
    }
}