/**
 * Convert PSGC excel file in ./input/ into ./sqlite/ph-addresses.db
 * Run: node scripts/to-sqlite.js PSGC-3Q-2022-Publication-Datafile.xlsx
 * 
 * Usage
 * 
 * Windows:
 *  set FILE_NAME=PSGC-3Q-2022-Publication-Datafile.xlsx&& node scripts/to-sqlite.js
 * 
 * Linux: 
 *  FILE_NAME=PSGC-3Q-2022-Publication-Datafile.xlsx node scripts/to-sqlite.js
 */

//// Core modules
const path = require('path')
const process = require('process')

//// External modules
const ExcelJS = require('exceljs')
const get = require('lodash.get')
const chunk = require('lodash.chunk')
const { Sequelize } = require('sequelize')




//// Modules


global.APP_DIR = path.resolve(__dirname + '/../').replace(/\\/g, '/'); // Turn back slash to slash for cross-platform compat

const storage = `${APP_DIR}/sqlite/ph-addresses.db`

; (async () => {
    let dbInstance = {
        close: () => { }
    }
    try {
        const FILE_NAME = get(process, 'env.FILE_NAME', '')

        dbInstance = new Sequelize({
            dialect: 'sqlite',
            storage: storage,
            logging: false,
        });
        await dbInstance.authenticate()
        console.log(`Converting file "${APP_DIR}/input/${FILE_NAME}" into sqlite database at "${storage}"`)

        let Address = require(`${APP_DIR}/sqlite/models/address`)('Address', dbInstance)
        await Address.drop()
        await Address.sync()

        let workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(`${APP_DIR}/input/${FILE_NAME}`)
        let worksheet = workbook.getWorksheet('PSGC')
        let results = []

        if (worksheet) {
            let ads = {}
            worksheet.getColumn(1).eachCell((cell, rowNumber) => {
                ads[cell.text] = (new String(worksheet.getRow(rowNumber).getCell(2).text)).trim()
            })
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber > 1) {
                    let psgc = (new String(row.getCell(1).text)).trim()
                    let code = (new String(row.getCell(3).text)).trim()
                    let level = (new String(row.getCell(4).text)).trim()
                    let cityMunCode = psgc.replace(/.{3}$/, '000')
                    let provCode = psgc.replace(/.{5}$/, '00000')
                    let regCode = psgc.replace(/.{8}$/, '00000000')

                    let cityMunName = ''
                    let provName = ''
                    let regName = ''
                    if (level === 'Bgy') {
                        cityMunName = ads[cityMunCode] || ''
                        provName = ads[provCode] || ''
                        regName = ads[regCode] || ''
                    } else if (level === 'Mun' || level === 'City' || level === 'SGU') {
                        // cityMunName = ''
                        provName = ads[provCode] || ''
                        regName = ads[regCode] || ''
                    } else if (level === 'Prov') {
                        // cityMunName = ''
                        // provName = ''
                        regName = ads[regCode] || ''
                    } else if (level === 'SubMun') {
                        cityMunName = ads[provCode] || '' // City is the province but not a province wutt
                        // provName = ''
                        regName = ads[regCode] || ''
                    } else if (level === 'Dist') {
                        // cityMunName = ''
                        // provName = ''
                        regName = ads['130000000'] // Dist is NCR only
                    }

                    let address = Address.build({
                        psgc: psgc,
                        code: code,
                        name: (new String(row.getCell(2).text)).trim(),
                        oldName: (new String(row.getCell(5).text)).trim(),
                        level: level,
                        provName: provName,
                        cityMunName: cityMunName,
                        regName: regName,
                    });
                    results.push(address.save())
                }
            });
        }
        let perChunk = 1000
        let chunks = chunk(results, perChunk)
        for (let x = 0; x < chunks.length; x++) {
            let batch = (x + 1) * perChunk
            if (batch > results.length) batch = results.length
            console.log(`Processed ${batch} of ${results.length} rows`)
            await Promise.all(chunks[x])
        }
    } catch (err) {
        console.error(err)
    } finally {
        console.log(`Done.`)
        dbInstance.close();
    }
})()


