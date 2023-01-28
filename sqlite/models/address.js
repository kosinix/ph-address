const { DataTypes } = require('sequelize')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        psgc: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        oldName: {
            type: DataTypes.STRING,
        },
        level: {
            type: DataTypes.STRING,
        },
        cityMunName: {
            type: DataTypes.STRING,
        },
        provName: {
            type: DataTypes.STRING,
        },
        regName: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false
    })
}
