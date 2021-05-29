/**
 * Converts data/ph-addresses.json into data/ph-addresses.db
 * Note: You must run scripts/psgc-to-json.js first to generate ph-addresses.json
 * 
 *
 * Run: node scripts/json-to-sqlite.js
 * */

const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3')
const APP_DIR = path.resolve(__dirname + '/../').replace(/\\/g, '/')
const db = new sqlite3.Database(path.join(APP_DIR, 'data/ph-addresses.db'));

try {
    const dir = path.resolve(__dirname + '/../').replace(/\\/g, '/')
    let phAddresses = require(dir + '/data/ph-addresses.json')

    let e = (s) => {
        if (s) {
            return s.replace('"', '\\"')
        } else {
            return ''
        }
    }

    let rows = phAddresses.map((a, i) => {
        return `("${e(a.code)}", "${e(a.name)}", "${e(a.level)}", "${e(a.regCode)}", "${e(a.provCode)}", "${e(a.cityMunCode)}", "${e(a.provName)}", "${e(a.cityMunName)}", "${e(a.full)}")`
    })

    let values = rows.join(", ")
    let query = 'INSERT INTO addresses (code, name, level, regCode, provCode, cityMunCode, provName, cityMunName, full) VALUES ' + values

    db.serialize(function () {
        db.run('DROP TABLE IF EXISTS addresses')
        db.run('CREATE TABLE `addresses` ( `id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `code`	TEXT, `name`	TEXT, `level`	TEXT, `regCode`	TEXT, `provCode`	TEXT, `cityMunCode`	TEXT, `provName`	TEXT, `cityMunName`	TEXT, `full`	TEXT        )')
        db.run(query, function (_, err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Done.');
        });
    });
    // fs.writeFileSync('./data/ph-addresses.sql', query, { encoding: 'utf8' })

} catch (err) {
    console.log(err)
}