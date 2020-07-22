//// Core modules

//// External modules

//// Modules


module.exports = {
    useMemory: function(){
        return require('./memory')
    },
    useMongo: () => {
        return require('./mongo')
    },
    useSqlite: () => {
        return require('./sqlite')
    }
}